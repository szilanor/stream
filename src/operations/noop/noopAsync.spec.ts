import {toArrayAsync} from '../../collectors';
import {noopAsync} from './noopAsync';
import {Stream} from '../../stream';

describe('Operation function: noopAsync()', () => {
  test('should do nothing with the entries', async () => {
    const res = await new Stream([1, 2, 3])
      .pipeAsync(noopAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
