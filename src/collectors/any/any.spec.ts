import {Stream} from '../../stream';
import {any} from './any';
import {empty} from '../../creators';

describe('Processor function: any()', () => {
  test('should return true for empty Stream', () => {
    const res = empty().collect(any(entry => !!entry));
    expect(res).toBe(false);
  });

  test('should return true if the callback function is undefined and the Stream has any entry', () => {
    const res = new Stream([1]).collect(any());
    expect(res).toBe(true);
  });

  test('should return true if the callback function returns true for any entry', () => {
    const res = new Stream([1, 1, 1]).collect(any(entry => entry % 2 === 1));
    expect(res).toBe(true);
  });

  test('should return false if the callback function returns false for all of the entries', () => {
    const res = new Stream([2, 2, 2]).collect(any(entry => entry % 2 === 1));
    expect(res).toBe(false);
  });
});
