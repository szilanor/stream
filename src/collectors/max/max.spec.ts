import {Stream} from '../../stream';
import {max} from './max';
import {empty} from '../../creators';

describe('Processor function: max()', () => {
  test('should return undefined for empty Stream', () => {
    const res = empty<number>().collect(max());
    expect(res).toBe(undefined);
  });

  test('should return max value of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(max());
    expect(res).toBe(4);
  });

  test('should return max value of the entries (max = first)', () => {
    const entries = [4, 1, 2, 3];
    const res = new Stream(entries).collect(max());
    expect(res).toBe(4);
  });
});
