import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {pairwiseAsync} from './pairwiseAsync';

describe('Operation function: pairwiseAsync()', () => {
  test('should create an array of arrays with the previous and the current element', async () => {
    const res = await new AsyncStream([1, 2, 3])
      .pipeAsync(pairwiseAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([
      [1, 2],
      [2, 3],
    ]);
  });
});
