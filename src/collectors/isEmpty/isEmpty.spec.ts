import {isEmpty} from './isEmpty';
import {stream} from '../../creators';

describe('Processor function: isEmpty()', () => {
  test('should return true for empty Stream', () => {
    const res = stream().collect(isEmpty());
    expect(res).toBe(true);
  });

  test('should return false for non-empty Array', () => {
    const res = stream([1]).collect(isEmpty());
    expect(res).toBe(false);
  });
});
