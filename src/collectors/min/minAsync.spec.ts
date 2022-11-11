import {Stream} from '../../stream';
import {empty} from '../../creators';
import {minAsync} from './minAsync';

describe('Processor function: minAsync()', () => {
  test('should return undefined for empty Stream', async () => {
    const res = await empty<number>().collectAsync(minAsync());
    expect(res).toBe(undefined);
  });

  test('should return min value of the entries', async () => {
    const entries = [1, 2, 3, 4];
    const res = await new Stream(entries).collectAsync(minAsync());
    expect(res).toBe(1);
  });
});
