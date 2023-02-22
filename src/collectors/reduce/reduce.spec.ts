import {reduce} from './reduce';
import {stream} from '../../creators';

describe('Processor function: reduce()', () => {
  test('should return the initial value for empty Stream', () => {
    const res = stream(Array<number>(0)).collect(reduce((a, b) => a + b, 0));
    expect(res).toBe(0);
  });

  test('should return the sum of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = stream(entries).collect(reduce((a, b) => a + b, 0));
    expect(res).toBe(10);
  });
});
