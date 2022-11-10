import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {truthyAsync} from './truthyAsync';

describe('Operation function: truthyAsync()', () => {
  test('should filter 0 as it is not a truthy value', async () => {
    const res = await new AsyncStream([0, 1, 2])
      .pipeAsync(truthyAsync())
      .collectAsync(toArrayAsync());

    expect(res).toStrictEqual([1, 2]);
  });

  test('should filter truthy values', async () => {
    const truthyEntries = [
      true,
      {},
      [],
      1,
      '0',
      'false',
      new Date(),
      -1,
      3.14,
      Infinity,
      -Infinity,
    ];
    const res = new AsyncStream(truthyEntries).pipeAsync(truthyAsync());

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual(truthyEntries);
    expect(res1).toStrictEqual(res2);
  });
});
