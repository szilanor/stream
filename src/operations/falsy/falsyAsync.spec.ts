import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {falsyAsync} from './falsyAsync';

describe('Operation function: falsyAsync()', () => {
  test('should keep 0 as a falsy value', async () => {
    const res = new AsyncStream([0, 1, 2]).pipeAsync(falsyAsync());

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual([0]);
    expect(res1).toStrictEqual(res2);
  });
});
