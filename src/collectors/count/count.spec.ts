import {count} from './count';
import {stream} from '../../creators';

describe('Processor function: count()', () => {
  test('should return 0 for empty Stream', () => {
    const res = stream().collect(count());
    expect(res).toBe(0);
  });

  test('should return proper element count for non-empty Array', () => {
    const res = stream([1]).collect(count());
    expect(res).toBe(1);
  });

  test('should return proper element count for non-empty Set', () => {
    const set = new Set([1]);
    const res = stream(set).collect(count());
    expect(res).toBe(1);
  });

  test('should return proper element count for non-empty Map', () => {
    const map = new Map([['a', 1]]);
    const res = stream(map).collect(count());
    expect(res).toBe(1);
  });
});
