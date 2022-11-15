import {toArrayAsync} from '../../collectors';
import {mapAsync} from './mapAsync';
import {Stream} from '../../stream';

describe('Operation function: mapAsync()', () => {
  test('should map entries with the callback function', async () => {
    const res = await new Stream([1, 2, 3])
      .pipeAsync(mapAsync(async entry => entry + 1))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([2, 3, 4]);
  });

  test('should map entries with the callback function from sync stream', async () => {
    const res = await new Stream([1, 2, 3])
      .pipeAsync(mapAsync(async entry => entry + 1))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([2, 3, 4]);
  });
});
