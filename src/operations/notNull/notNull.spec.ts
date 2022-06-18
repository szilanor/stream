import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {notNull} from './notNull';

describe('Operation function: notNull()', () => {
  test('should filter null or undefined entries', () => {
    const res = new Stream([1, 2, 3, null, undefined])
      .pipe(notNull())
      .collect(toArray());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
