import {toArrayAsync} from '../../collectors';
import {fromAsync} from './fromAsync';

describe('Creator function: fromAsync()', () => {
  test('should return a Stream with the entries of the parameter', async () => {
    const res = await fromAsync([1, 2, 3]);

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual([1, 2, 3]);
    expect(res1).toStrictEqual(res2);
  });
});
