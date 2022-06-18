import {range} from './range';
import {toArray} from '../../collectors';

describe('Creator function: range()', () => {
  test('should return an empty Stream', () => {
    const res = range(0, 0).collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test('should return a Stream of 3 entries from 0', () => {
    const res = range(0, 3, 1).collect(toArray());
    expect(res).toStrictEqual([0, 1, 2]);
  });

  test('should return a Stream of 3 entries from 0 and the step should be 3', () => {
    const res = range(0, 3, 3).collect(toArray());
    expect(res).toStrictEqual([0, 3, 6]);
  });
});
