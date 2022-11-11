import {Stream} from '../../stream';
import {reduceAsync} from './reduceAsync';

describe('Processor function: reduceAsync()', () => {
  test('should return the initial value for empty Stream', async () => {
    const res = await new Stream([0]).collectAsync(
      reduceAsync(async (a, b) => a + b, 0)
    );
    expect(res).toBe(0);
  });

  test('should return the sum of the entries', async () => {
    const entries = [1, 2, 3, 4];
    const res = await new Stream(entries).collectAsync(
      reduceAsync(async (a, b) => a + b, 0)
    );
    expect(res).toBe(10);
  });
});
