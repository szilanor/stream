import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {distinct} from './distinct';

describe('Operation function: distinct()', () => {
  test('should filter duplicates', () => {
    const res = new Stream([1, 1, 2, 2, 2, 3])
      .pipe(distinct())
      .collect(toArray());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
