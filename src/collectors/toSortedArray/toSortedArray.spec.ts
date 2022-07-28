import {Stream} from '../../stream';
import {toSortedArray} from './toSortedArray';
import {empty} from '../../creators';

describe('Processor function: toSortedArray()', () => {
  const comparer = (a: number, b: number) => a - b;

  test('should return an empty array for empty Stream', () => {
    const res = empty<number>().collect(toSortedArray(comparer));
    expect(res).toStrictEqual([]);
  });

  test('should return an array of the entries ascending', () => {
    const entries = [2, 1, 4, 3];
    const res = new Stream(entries).collect(toSortedArray(comparer));
    expect(res).toStrictEqual([1, 2, 3, 4]);
  });

  test('should return an array of the entries descending', () => {
    const entries = [2, 1, 4, 3];
    const res = new Stream(entries).collect(toSortedArray(comparer, false));
    expect(res).toStrictEqual([4, 3, 2, 1]);
  });
});
