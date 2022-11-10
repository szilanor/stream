import {toArrayAsync} from '../../collectors';
import {repeatAsync} from './repeatAsync';
import {takeAsync} from '../../operations/take/takeAsync';

describe('Creator function: repeatAsync()', () => {
  test('should return an empty Stream', async () => {
    const res = await repeatAsync(1, 0).collectAsync(toArrayAsync());
    expect(res).toStrictEqual([]);
  });

  test('should return a Stream of infinite amount of entries', async () => {
    const res = await repeatAsync(1)
      .pipeAsync(takeAsync(3))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([1, 1, 1]);
  });

  test('should return a Stream of 3 entries with the same value', async () => {
    const res = await repeatAsync(1, 3).collectAsync(toArrayAsync());
    expect(res).toStrictEqual([1, 1, 1]);
  });
});
