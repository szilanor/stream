import {minBy} from './minBy';
import {stream} from '../../creators';

describe('Processor function: minBy()', () => {
  const comparer = (a: number, b: number) => a - b;

  test('should return undefined for empty Stream', () => {
    const res = stream<number>().collect(minBy(comparer));
    expect(res).toBe(undefined);
  });

  test('should return the min value of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = stream(entries).collect(minBy(comparer));
    expect(res).toBe(1);
  });

  test('should return the min value of the object entries', () => {
    const entries = [{a: 4}, {a: 1}, {a: 2}, {a: 3}];
    const objectComparer = (a: {a: number}, b: {a: number}) => a.a - b.a;
    const res = stream(entries).collect(minBy(objectComparer));
    expect(res).toStrictEqual({a: 1});
  });
});
