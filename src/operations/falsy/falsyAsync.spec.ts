import {toArrayAsync} from '../../collectors';
import {falsyAsync} from './falsyAsync';
import {Stream} from '../../stream';

describe('Operation function: falsyAsync()', () => {
  test('should keep 0 as a falsy value', async () => {
    const res = await new Stream([0, 1, 2])
      .pipeAsync(falsyAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([0]);
  });
});
