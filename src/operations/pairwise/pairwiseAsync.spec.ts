import {toArrayAsync} from '../../collectors';
import {pairwiseAsync} from './pairwiseAsync';
import {Stream} from '../../stream';

describe('Operation function: pairwiseAsync()', () => {
  test('should create an array of arrays with the previous and the current element', async () => {
    const res = await new Stream([1, 2, 3])
      .pipeAsync(pairwiseAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([
      [1, 2],
      [2, 3],
    ]);
  });
});
