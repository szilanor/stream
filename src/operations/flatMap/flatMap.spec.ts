import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {flatMap} from './flatMap';

describe('Operation function: flatMap()', () => {
  test('should flatMap array entries with the callback function', () => {
    const res = new Stream([{a: [1]}, {a: [2]}, {a: [3]}])
      .pipe(flatMap(entry => entry.a))
      .collect(toArray());

    expect(res).toStrictEqual([1, 2, 3]);
  });

  test('should flatMap iterable entries with the callback function', () => {
    const iterableFor = (n: number) =>
      function* () {
        yield n;
      };

    const res = new Stream([
      {a: iterableFor(1)},
      {a: iterableFor(2)},
      {a: iterableFor(3)},
    ])
      .pipe(flatMap(entry => entry.a()))
      .collect(toArray());

    expect(res).toStrictEqual([1, 2, 3]);
  });
});
