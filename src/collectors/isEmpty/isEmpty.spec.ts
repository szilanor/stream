import {Stream} from '../../stream';
import {isEmpty} from './isEmpty';
import {empty} from '../../creators';

describe('Processor function: isEmpty()', () => {
  test('should return true for empty Stream', () => {
    const res = empty().collect(isEmpty());
    expect(res).toBe(true);
  });

  test('should return false for non-empty Array', () => {
    const res = new Stream([1]).collect(isEmpty());
    expect(res).toBe(false);
  });
});
