import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {flat} from './flat';

describe('Operation function: flat()', () => {
  test('should flatten array of arrays', () => {
    const res = new Stream([[1, 2, 3], [4], [5, 6]])
      .pipe(flat())
      .collect(toArray());
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
