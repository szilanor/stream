/*
npx ts-node ./benchmarks/groupBy.ts

This benchmark shows that native code is always faster, so you have to choose between code readability and speed

Map x 710 ops/sec ±93.32% (5 runs sampled)
Stream groupBy x 352,196 ops/sec ±0.56% (94 runs sampled)
Stream groupByRecord x 346,347 ops/sec ±0.68% (97 runs sampled)
Object x 661,179 ops/sec ±5.25% (84 runs sampled)
Reduce x 657,657 ops/sec ±0.51% (94 runs sampled)
Object with For Loop x 672,380 ops/sec ±5.64% (87 runs sampled)
Fastest is Reduce
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {Suite} from 'benchmark';
import {distinct, from, groupBy, groupByRecord, map, filter} from '../src';

const input = [
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1,
  2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1,
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1,
  2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1,
];

type TOddOrEven = 'odd' | 'even';
type TResultType = Record<TOddOrEven, number[]>;

const resultClassic: TResultType = {
  odd: [],
  even: [],
};
const resultClassicForLoop: TResultType = {odd: [], even: []};
const resultClassicWithMap = new Map<TOddOrEven, number[]>();
const oddOrEvenFunction: (value: number) => TOddOrEven = (value: number) =>
  value % 2 === 0 ? 'even' : 'odd';
const mapFunction: (x: number) => number = x => x + 1;
const filterFunction: (x: number) => boolean = x => x < 10;

const suite = new Suite('Group by');
suite
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .add('Map', () =>
    new Set(input).forEach(x => {
      const value = mapFunction(x);
      if (!filterFunction(value)) {
        return;
      }
      const key: TOddOrEven = oddOrEvenFunction(value);
      resultClassicWithMap.set(key, [
        ...(resultClassicWithMap.get(key) || []),
        value,
      ]);
    })
  )
  .add('Stream groupBy', () =>
    from(input)
      .pipe(distinct(), map(mapFunction), filter(filterFunction))
      .collect(groupBy(oddOrEvenFunction))
  )
  .add('Stream groupByRecord', () =>
    from(input)
      .pipe(distinct(), map(mapFunction), filter(filterFunction))
      .collect(groupByRecord(oddOrEvenFunction))
  )
  .add('Object', () =>
    new Set(input).forEach(x => {
      const value = mapFunction(x);
      if (!filterFunction(x)) {
        return;
      }
      const key: TOddOrEven = oddOrEvenFunction(value);
      // using an object allows us to simply push the result
      resultClassic[key].push(value);
    })
  )
  .add('Reduce', () =>
    Array.from(new Set(input))
      .map(mapFunction)
      .filter(filterFunction)
      .reduce(
        (result, number) => {
          const key: TOddOrEven = oddOrEvenFunction(number);
          result[key].push(number);
          return result;
        },
        {odd: [], even: []} as Record<TOddOrEven, number[]>
      )
  )
  .add('Object with For Loop', () => {
    for (const number of Array.from(new Set<number>(input))) {
      const value = mapFunction(number);
      if (!filterFunction(value)) {
        continue;
      }
      const key: TOddOrEven = oddOrEvenFunction(value);
      resultClassicForLoop[key].push(value);
    }
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'));
  })
  .run({async: true});
