import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {notNullOrEmptyAsync} from './notNullOrEmptyAsync';

describe('Operation function: notNullOrEmptyAsync()', () => {
  test('should filter null or undefined or empty entries', async () => {
    const res = new AsyncStream([
      '1',
      '',
      '2',
      [],
      [1],
      null,
      undefined,
    ]).pipeAsync(notNullOrEmptyAsync());

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual(['1', '2', [1]]);
    expect(res1).toStrictEqual(res2);
  });
});
