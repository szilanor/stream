import {Stream} from '../../stream';
import {toArrayAsync} from '../../collectors';
import {filterAsync} from './filterAsync';

describe('Operation function: filterAsync()', () => {
  test('should keep entries if the callback function return with true', async () => {
    const res = await new Stream([1, 2, 3])
      .pipeAsync(filterAsync(async entry => entry % 2 === 0))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([2]);
  });

  test('should keep entries if the callback function return with true from sync stream', async () => {
    const res = await new Stream([1, 2, 3])
      .pipeAsync(filterAsync(async entry => entry % 2 === 0))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([2]);
  });
});
