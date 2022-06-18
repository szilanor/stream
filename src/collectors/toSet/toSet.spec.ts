import {Stream} from '../../stream';
import {toSet} from './toSet';
import {empty} from '../../creators';

describe('Processor function: toSet()', () => {
  test('should return an empty set for empty Stream', () => {
    const res = empty().collect(toSet());
    expect(res).toStrictEqual(new Set<unknown>());
  });

  test('should return a set of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(toSet());
    expect(res).toStrictEqual(new Set<number>(entries));
  });

  test('should return a set of the entries with one element', () => {
    const entries = [1, 1, 1, 1];
    const res = new Stream(entries).collect(toSet());
    expect(res).toStrictEqual(new Set<number>([1]));
  });
});
