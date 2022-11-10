import {toArrayAsync} from '../../collectors';
import {rangeAsync} from './rangeAsync';

describe('Creator function: rangeAsync()', () => {
  test('should return an empty Stream', async () => {
    const res = await rangeAsync(0, 0).collectAsync(toArrayAsync());
    expect(res).toStrictEqual([]);
  });

  test('should return a Stream of 3 entries from 0', async () => {
    const res = await rangeAsync(0, 3, 1).collectAsync(toArrayAsync());
    expect(res).toStrictEqual([0, 1, 2]);
  });

  test('should return a Stream of 3 entries from 0 and the step should be 3', async () => {
    const res = await rangeAsync(0, 3, 3).collectAsync(toArrayAsync());
    expect(res).toStrictEqual([0, 3, 6]);
  });
});
