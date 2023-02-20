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
import {from, map, map2, repeat, toArray} from '../src';

const input = repeat(() => Math.round(Math.random() * 1000), 1000).collect(
  toArray()
);

const mapFunction: (x: number) => number = x => x + 1;

const suite = new Suite('Group by');
suite
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .add('Array.map', () => {
    input.map(mapFunction);
  })
  .add('Stream.map', () =>
    from(input).pipe(map(mapFunction)).collect(toArray())
  )
  .add('Stream.map2', () =>
    from(input).pipe(map2(mapFunction)).collect(toArray())
  )
  .add('Stream.map3', () => from(input).map(mapFunction).collect(toArray()))
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'));
  })
  .run({async: true});
