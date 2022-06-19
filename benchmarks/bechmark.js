/* eslint-disable node/no-missing-require */
/* eslint-disable node/no-extraneous-require */
const Benchmark = require('benchmark');
const Stream = require('@szilanor/stream');

const input = [1, 2, 3, 4, 5];
const suite = new Benchmark.Suite('Classic vs Stream API');
suite
  .add('Classic JS', () => input.map(x => x + 1).every(x => x % 2 === 0))
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .add('Stream API', () =>
    Stream.from(input)
      .pipe(Stream.map(x => x + 1))
      .collect(Stream.all(x => x % 2 === 0))
  )
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'));
  })
  .run({async: true});
