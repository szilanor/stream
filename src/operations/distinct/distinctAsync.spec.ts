import {distinctAsync} from './distinctAsync';
import {Stream} from '../../stream';
import {toArrayAsync} from '../../collectors/toArray/toArrayAsync';

describe('Operation function: distinctByAsync()', () => {
  test('should filter duplicates', async () => {
    const res = new Stream([1, 1, 2, 2, 2, 3]).pipeAsync(distinctAsync());

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual([1, 2, 3]);
    expect(res1).toStrictEqual(res2);
  });
});
