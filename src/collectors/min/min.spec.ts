import {Stream} from '../../stream';
import {min} from './min';
import {empty} from '../../creators';

describe('Processor function: min()', () => {
  test('should return undefined for empty Stream', () => {
    const res = empty<number>().collect(min());
    expect(res).toBe(undefined);
  });

  test('should return min value of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(min());
    expect(res).toBe(1);
  });
});
