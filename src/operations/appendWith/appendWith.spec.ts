import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {appendWith} from './appendWith';

describe('Operation function: appendWith()', () => {
  test('should appendWith an iterable before the Stream', () => {
    const res = new Stream([1, 2, 3])
      .pipe(appendWith([4, 5], [6]))
      .collect(toArray());
    expect(res).toStrictEqual([4, 5, 6, 1, 2, 3]);
  });
});
