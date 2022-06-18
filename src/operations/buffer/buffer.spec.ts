import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {buffer} from './buffer';

describe('Operation function: buffer()', () => {
  test('should buffer the element in the given size', () => {
    const res = new Stream([1, 2, 3, 4, 5, 6, 7])
      .pipe(buffer(2))
      .collect(toArray());
    expect(res).toStrictEqual([[1, 2], [3, 4], [5, 6], [7]]);
  });
});
