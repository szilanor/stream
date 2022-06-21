import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {defaultIfEmpty} from './defaultIfEmpty';
import {empty} from '../../creators';

describe('Operation function: defaultIfEmpty()', () => {
  test('should return only the value parameter on empty stream', () => {
    const res = empty<number>().pipe(defaultIfEmpty(1)).collect(toArray());
    expect(res).toStrictEqual([1]);
  });

  test('should return the source without the value parameter', () => {
    const res = new Stream([1, 2, 3])
      .pipe(defaultIfEmpty(4))
      .collect(toArray());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
