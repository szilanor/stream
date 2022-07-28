/*
npx ts-node ./benchmarks/all.ts

Stream can be faster due to iterable computing. In this benchmark we know the answer after the first element, so
we don't have to map, filter, distinct anything else

Stream x 2,633,922 ops/sec ±0.84% (95 runs sampled)
Classic x 752,614 ops/sec ±0.37% (95 runs sampled)
Fastest is Stream
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {Suite} from 'benchmark';
import {distinct, from, map, filter, all} from '../src';

const input = [
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1,
  2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1,
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1,
  2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1,
];

const oddOrEvenFunction = (value: number) => value % 2 === 0;
const mapFunction: (x: number) => number = x => x + 1;
const filterFunction: (x: number) => boolean = x => x < 10;

const suite = new Suite('All');
suite
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .add('Stream', () =>
    from(input)
      .pipe(distinct(), map(mapFunction), filter(filterFunction))
      .collect(all(oddOrEvenFunction))
  )
  .add('Classic', () => {
    Array.from(new Set<number>(input))
      .map(mapFunction)
      .filter(filterFunction)
      .every(oddOrEvenFunction);
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'));
  })
  .run({async: true});
