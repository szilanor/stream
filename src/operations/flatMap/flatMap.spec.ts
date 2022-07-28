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

  test('Example in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#for_adding_and_removing_items_during_a_map', () => {
    const res = new Stream([5, 4, -3, 20, 17, -33, -4, 18])
      .pipe(flatMap(n => (n < 0 ? [] : n % 2 === 0 ? [n] : [n - 1, 1])))
      .collect(toArray());

    expect(res).toStrictEqual([4, 1, 4, 20, 16, 1, 18]);
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
