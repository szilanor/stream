import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {bufferAsync} from './bufferAsync';

describe('Operation function: bufferAsync()', () => {
  test('should buffer the element in the given size', async () => {
    const res = new AsyncStream([1, 2, 3, 4, 5, 6, 7]).pipeAsync(
      bufferAsync(2)
    );

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual([[1, 2], [3, 4], [5, 6], [7]]);
    expect(res1).toStrictEqual(res2);
  });
});
