import {Stream} from '../../stream';
import {all} from './all';
import {empty} from '../../creators';

describe('Processor function: all()', () => {
  test('should return true for empty Stream', () => {
    const res = empty().collect(all(entry => !!entry));
    expect(res).toBe(true);
  });

  test('should return true if the callback function returns true for all entries', () => {
    const res = new Stream([1, 1, 1]).collect(all(entry => entry % 2 === 1));
    expect(res).toBe(true);
  });

  test('should return false if the callback function returns false for one of the entries', () => {
    const res = new Stream([1, 2, 1]).collect(all(entry => entry % 2 === 1));
    expect(res).toBe(false);
  });
});
