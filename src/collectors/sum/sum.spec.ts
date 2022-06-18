import {Stream} from '../../stream';
import {sum} from './sum';

describe('Processor function: sum()', () => {
  test('should return undefined for empty Stream', () => {
    const res = new Stream([]).collect(sum());
    expect(res).toBe(undefined);
  });

  test('should return the sum of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(sum());
    expect(res).toBe(10);
  });
});
