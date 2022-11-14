/*
npx ts-node ./benchmarks/all.ts

Stream can be faster due to iterable computing. In this benchmark we know the answer after the first element, so
we don't have to map, filter, distinct anything else

input = [
   65, 510, 420, 889, 499, 680, 727,   0, 689, 822, 515, 191,
  742, 821, 910,  65, 643, 402, 130, 461, 977,  70, 807, 817,
  241,  12, 241, 648, 650, 851, 739, 902, 621, 975, 215, 460,
   56, 121, 747, 683, 395, 858, 942, 698, 422,  19, 833,  71,
  632, 574, 262, 604,  20, 411,  35, 787, 252, 992, 765, 940,
  959, 978, 805, 747,
  ... 900 more items
]

Stream x 1,437,212 ops/sec ±0.29% (96 runs sampled)
Classic x 37,858 ops/sec ±1.02% (96 runs sampled)
Fastest is Stream
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {Suite} from 'benchmark';
import {distinct, every, filter, from, map, repeat, toArray} from '../src';

const input = repeat(() => Math.round(Math.random() * 1000), 1000).collect(
  toArray()
);

console.log({input});

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
      .collect(every(oddOrEvenFunction))
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
