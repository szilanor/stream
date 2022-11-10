import {toArrayAsync} from '../../collectors';
import {AsyncStream} from '../../async-stream';
import {notNullOrWhitespaceAsync} from './notNullOrWhitespaceAsync';

describe('Operation function: notNullOrWhitespaceAsync()', () => {
  test('should filter null or undefined or whitespace entries', async () => {
    const res = new AsyncStream(['1', '   ', '2', undefined]).pipeAsync(
      notNullOrWhitespaceAsync()
    );

    const res1 = await res.collectAsync(toArrayAsync());
    const res2 = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual(['1', '2']);
    expect(res1).toStrictEqual(res2);
  });
});
