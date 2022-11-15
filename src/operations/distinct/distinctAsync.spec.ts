import {distinctAsync} from './distinctAsync';
import {Stream} from '../../stream';
import {toArrayAsync} from '../../collectors';

describe('Operation function: distinctByAsync()', () => {
  test('should filter duplicates', async () => {
    const res = await new Stream([1, 1, 2, 2, 2, 3])
      .pipeAsync(distinctAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
