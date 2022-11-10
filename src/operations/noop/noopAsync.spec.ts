import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {noopAsync} from './noopAsyc';

describe('Operation function: noopAsync()', () => {
  test('should do nothing with the entries', async () => {
    const res = await new AsyncStream([1, 2, 3])
      .pipeAsync(noopAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
