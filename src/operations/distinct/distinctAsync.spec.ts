import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {distinctAsync} from './distinctAsync';

describe('Operation function: distinctAsync()', () => {
  test('should filter duplicates', async () => {
    const res = new AsyncStream([1, 1, 2, 2, 2, 3]).pipeAsync(distinctAsync());

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual([1, 2, 3]);
    expect(res1).toStrictEqual(res2);
  });

  test('should filter duplicates with comparer', async () => {
    const res = await new AsyncStream([{a: 1}, {a: 1}, {a: 2}, {a: 2}, {a: 3}])
      .pipeAsync(distinctAsync(async (a, b) => a.a === b.a))
      .collectAsync(toArrayAsync());

    expect(res).toStrictEqual([{a: 1}, {a: 2}, {a: 3}]);
  });
});
