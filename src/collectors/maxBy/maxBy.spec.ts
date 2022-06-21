import {Stream} from '../../stream';
import {maxBy} from './maxBy';
import {empty} from '../../creators';

describe('Processor function: maxBy()', () => {
  const comparer = (a: number, b: number) => a - b;

  test('should return undefined for empty Stream', () => {
    const res = empty<number>().collect(maxBy(comparer));
    expect(res).toBe(undefined);
  });

  test('should return the max value of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(maxBy(comparer));
    expect(res).toBe(4);
  });

  test('should return the max value of the object entries', () => {
    const entries = [{a: 4}, {a: 1}, {a: 2}, {a: 3}];
    const objectComparer = (a: {a: number}, b: {a: number}) => a.a - b.a;
    const res = new Stream(entries).collect(maxBy(objectComparer));
    expect(res).toStrictEqual({a: 4});
  });
});
