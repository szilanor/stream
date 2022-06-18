import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {concatWith} from './concatWith';

describe('Operation function: concatWith()', () => {
  test('should concat an iterable after the Stream', () => {
    const res = new Stream([1, 2, 3])
      .pipe(concatWith([4, 5], [6]))
      .collect(toArray());
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
