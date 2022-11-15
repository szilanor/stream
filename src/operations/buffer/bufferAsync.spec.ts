import {toArrayAsync} from '../../collectors';
import {bufferAsync} from './bufferAsync';
import {Stream} from '../../stream';

describe('Operation function: bufferAsync()', () => {
  test('should buffer the element in the given size', async () => {
    const res = await new Stream([1, 2, 3, 4, 5, 6, 7])
      .pipeAsync(bufferAsync(2))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([[1, 2], [3, 4], [5, 6], [7]]);
  });
});
