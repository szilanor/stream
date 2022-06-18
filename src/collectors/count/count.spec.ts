import {Stream} from '../../stream';
import {count} from './count';
import {empty} from '../../creators';

describe('Processor function: count()', () => {
  test('should return 0 for empty Stream', () => {
    const res = empty().collect(count());
    expect(res).toBe(0);
  });

  test('should return proper element count for non-empty Array', () => {
    const res = new Stream([1]).collect(count());
    expect(res).toBe(1);
  });

  test('should return proper element count for non-empty Set', () => {
    const set = new Set([1]);
    const res = new Stream(set).collect(count());
    expect(res).toBe(1);
  });

  test('should return proper element count for non-empty Map', () => {
    const map = new Map([['a', 1]]);
    const res = new Stream(map).collect(count());
    expect(res).toBe(1);
  });
});
