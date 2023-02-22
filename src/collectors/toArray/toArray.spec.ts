import {toArray} from './toArray';
import {stream} from '../../creators';

describe('Processor function: toArray()', () => {
  test('should return an empty array for empty Stream', () => {
    const res = stream().collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test('should return an array of the entries', () => {
    const entries = [1, 1, 1, 1];
    const res = stream(entries).collect(toArray());
    expect(res).toStrictEqual(entries);
  });
});
