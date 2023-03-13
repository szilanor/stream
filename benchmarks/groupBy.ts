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
import {
  distinct,
  filter,
  groupBy,
  groupByRecord,
  map,
  reduce,
  repeat,
  stream,
  toArray,
} from '../src';

const input = repeat(() => Math.round(Math.random() * 1000), 1000).collect(
  toArray()
);

type TOddOrEven = 'odd' | 'even';
type TResultType = Partial<Record<TOddOrEven, number[]>>;

const oddOrEvenFunction: (value: number) => TOddOrEven = (value: number) =>
  value % 2 === 0 ? 'even' : 'odd';
const mapFunction: (x: number) => number = x => x + 1;
const filterFunction: (x: number) => boolean = x => x < 10;

const suite = new Suite('Group by');
suite
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .add('Map', () => {
    const result = new Map<TOddOrEven, number[]>();
    new Set(input).forEach(x => {
      const value = mapFunction(x);
      if (!filterFunction(value)) {
        return;
      }
      const key: TOddOrEven = oddOrEvenFunction(value);
      const existing = result.get(key);
      if (existing) {
        existing.push(x);
      } else {
        result.set(key, [x]);
      }
    });
  })
  .add('Stream groupBy', () =>
    stream(input)
      .pipe(distinct(), map(mapFunction), filter(filterFunction))
      .collect(groupBy(oddOrEvenFunction))
  )
  .add('Stream groupByRecord', () =>
    stream(input)
      .pipe(distinct(), map(mapFunction), filter(filterFunction))
      .collect(groupByRecord(oddOrEvenFunction))
  )
  .add('Stream reduce', () => {
    const result: TResultType = {};
    stream(input)
      .pipe(distinct(), map(mapFunction), filter(filterFunction))
      .collect(
        reduce((prev, current) => {
          const key: TOddOrEven = oddOrEvenFunction(current);
          const existing = result[key];
          if (existing) {
            existing.push(current);
          } else {
            result[key] = [current];
          }
          return prev;
        }, result)
      );
  })
  .add('Object', () => {
    const result: TResultType = {};
    new Set(input).forEach(x => {
      const value = mapFunction(x);
      if (!filterFunction(x)) {
        return;
      }
      const key: TOddOrEven = oddOrEvenFunction(value);
      const existing = result[key];
      if (existing) {
        existing.push(x);
      } else {
        result[key] = [x];
      }
    });
  })
  .add('Reduce', () => {
    const result: TResultType = {};
    Array.from(new Set(input))
      .map(mapFunction)
      .filter(filterFunction)
      .reduce((prev, current) => {
        const key: TOddOrEven = oddOrEvenFunction(current);
        const existing = result[key];
        if (existing) {
          existing.push(current);
        } else {
          result[key] = [current];
        }
        return prev;
      }, result);
  })
  .add('Object with For Loop', () => {
    const result: TResultType = {};
    for (const number of Array.from(new Set<number>(input))) {
      const value = mapFunction(number);
      if (!filterFunction(value)) {
        continue;
      }
      const key: TOddOrEven = oddOrEvenFunction(value);
      const existing = result[key];
      if (existing) {
        existing.push(number);
      } else {
        result[key] = [number];
      }
    }
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'));
  })
  .run({async: true});
