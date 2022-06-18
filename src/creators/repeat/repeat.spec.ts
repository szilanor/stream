import {repeat} from './repeat';
import {toArray} from '../../collectors';
import {take} from '../../operations';

describe('Creator function: repeat()', () => {
  test('should return an empty Stream', () => {
    const res = repeat(1, 0).collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test('should return a Stream of infinite amount of entries', () => {
    const res = repeat(1).pipe(take(3)).collect(toArray());
    expect(res).toStrictEqual([1, 1, 1]);
  });

  test('should return a Stream of 3 entries with the same value', () => {
    const res = repeat(1, 3).collect(toArray());
    expect(res).toStrictEqual([1, 1, 1]);
  });
});
