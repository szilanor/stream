import {notNullOrEmptyAsync} from './notNullOrEmptyAsync';
import {Stream} from '../../stream';
import {toArrayAsync} from '../../collectors';

describe('Operation function: notNullOrEmptyAsync()', () => {
  test('should filter null or undefined or empty entries', async () => {
    const res = await new Stream(['1', '', '2', [], [1], null, undefined])
      .pipeAsync(notNullOrEmptyAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual(['1', '2', [1]]);
  });
});
