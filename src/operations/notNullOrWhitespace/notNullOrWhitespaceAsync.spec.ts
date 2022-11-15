import {toArrayAsync} from '../../collectors';
import {notNullOrWhitespaceAsync} from './notNullOrWhitespaceAsync';
import {Stream} from '../../stream';

describe('Operation function: notNullOrWhitespaceAsync()', () => {
  test('should filter null or undefined or whitespace entries', async () => {
    const res = await new Stream(['1', '   ', '2', undefined])
      .pipeAsync(notNullOrWhitespaceAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual(['1', '2']);
  });
});
