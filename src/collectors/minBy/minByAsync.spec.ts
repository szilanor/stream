import {Stream} from '../../stream';
import {empty} from '../../creators';
import {minByAsync} from './minByAsync';

describe('Processor function: minByAsync()', () => {
  const comparer = async (a: number, b: number) => a - b;

  test('should return undefined for empty Stream', async () => {
    const res = await empty<number>().collectAsync(minByAsync(comparer));
    expect(res).toBe(undefined);
  });

  test('should return the min value of the entries', async () => {
    const entries = [1, 2, 3, 4];
    const res = await new Stream(entries).collectAsync(minByAsync(comparer));
    expect(res).toBe(1);
  });

  test('should return the min value of the object entries', async () => {
    const entries = [{a: 4}, {a: 1}, {a: 2}, {a: 3}];
    const objectComparer = (a: {a: number}, b: {a: number}) => a.a - b.a;
    const res = await new Stream(entries).collectAsync(
      minByAsync(objectComparer)
    );
    expect(res).toStrictEqual({a: 1});
  });
});
