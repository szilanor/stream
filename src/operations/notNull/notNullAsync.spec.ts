import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {notNullAsync} from './notNullAsync';

describe('Operation function: notNullAsync()', () => {
  test('should filter null or undefined entries', async () => {
    const res = new AsyncStream([1, 2, 3, null, undefined]).pipeAsync(
      notNullAsync()
    );

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual([1, 2, 3]);
    expect(res1).toStrictEqual(res2);
  });
});
