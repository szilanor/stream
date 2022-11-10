import {concat} from './concat';
import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {empty} from '../empty/empty';

describe('Creator function: concat()', () => {
  test('should return empty Stream for empty iterables', () => {
    const res = concat(empty(), [], new Set()).collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test('should return a Stream with the concatenated entries', () => {
    const res = concat([1], new Set([2]), new Stream([3]));

    const res1 = res.collect(toArray());
    const res2 = res.collect(toArray());

    expect(res1).toStrictEqual([1, 2, 3]);
    expect(res1).toStrictEqual(res2);
  });
});
