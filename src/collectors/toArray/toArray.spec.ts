import {Stream} from '../../stream';
import {toArray} from './toArray';
import {empty} from '../../creators';

describe('Processor function: toArray()', () => {
  test('should return an empty array for empty Stream', () => {
    const res = empty().collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test('should return an array of the entries', () => {
    const entries = [1, 1, 1, 1];
    const res = new Stream(entries).collect(toArray());
    expect(res).toStrictEqual(entries);
  });
});
