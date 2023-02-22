import {sum} from './sum';
import {stream} from '../../creators';

describe('Processor function: sum()', () => {
  test('should return undefined for empty Stream', () => {
    const res = stream([]).collect(sum());
    expect(res).toBe(undefined);
  });

  test('should return the sum of the entries', () => {
    const entries = [1, 2, 3, 4];
    const res = stream(entries).collect(sum());
    expect(res).toBe(10);
  });
});
