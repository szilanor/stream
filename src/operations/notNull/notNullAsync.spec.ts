import {notNullAsync} from './notNullAsync';
import {Stream} from '../../stream';
import {toArrayAsync} from '../../collectors';

describe('Operation function: notNullAsync()', () => {
  test('should filter null or undefined entries', async () => {
    const res = await new Stream([1, 2, 3, null, undefined])
      .pipeAsync(notNullAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
