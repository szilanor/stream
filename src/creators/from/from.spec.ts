import {from} from './from';
import {toArray} from '../../collectors';

describe('Creator function: from()', () => {
  test('should return a Stream with the entries of the parameter', () => {
    const res = from([1, 2, 3]).collect(toArray());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
