import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {flatten} from './flatten';

describe('Operation function: flatten()', () => {
  test('should flatten array of arrays', () => {
    const res = new Stream([[1, 2, 3], [4], [5, 6]])
      .pipe(flatten())
      .collect(toArray());
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
