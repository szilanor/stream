import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {mapAsync} from './mapAsync';
import {Stream} from '../../stream';

describe('Operation function: mapAsync()', () => {
  test('should map entries with the callback function', async () => {
    const res = new AsyncStream([1, 2, 3]).pipe(
      mapAsync(async entry => entry + 1)
    );

    const res1 = await res.collect(toArrayAsync());
    const res2 = await res.collect(toArrayAsync());

    expect(res1).toStrictEqual([2, 3, 4]);
    expect(res1).toStrictEqual(res2);
  });

  test('should map entries with the callback function from sync stream', async () => {
    const res = new Stream([1, 2, 3]).pipeAsync(
      mapAsync(async entry => entry + 1)
    );

    const res1 = await res.collect(toArrayAsync());
    const res2 = await res.collect(toArrayAsync());

    expect(res1).toStrictEqual([2, 3, 4]);
    expect(res1).toStrictEqual(res2);
  });
});
