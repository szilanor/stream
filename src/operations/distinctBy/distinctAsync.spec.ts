import {distinctByAsync} from './distinctByAsync';
import {toArrayAsync} from '../../collectors';
import {Stream} from '../../stream';

describe('Operation function: distinctByAsync()', () => {
  test('should filter duplicates', async () => {
    const res = await new Stream([1, 1, 2, 2, 2, 3])
      .pipeAsync(distinctByAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([1, 2, 3]);
  });

  test('should filter duplicates with comparer', async () => {
    const res = await new Stream([{a: 1}, {a: 1}, {a: 2}, {a: 2}, {a: 3}])
      .pipeAsync(distinctByAsync(async (a, b) => a.a === b.a))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([{a: 1}, {a: 2}, {a: 3}]);
  });
});
