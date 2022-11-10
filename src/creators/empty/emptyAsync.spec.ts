import {toArrayAsync} from '../../collectors';
import {emptyAsync} from './emptyAsync';

describe('Creator function: emptyAsync()', () => {
  test('should return empty Stream', async () => {
    const res = await emptyAsync().collectAsync(toArrayAsync());
    expect(res).toStrictEqual([]);
  });
});
