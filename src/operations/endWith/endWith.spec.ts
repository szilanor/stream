import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {endWith} from './endWith';
import {empty} from '../../creators';

describe('Operation function: endWith()', () => {
  test('should return only the value parameter on empty stream', () => {
    const res = empty<number>().pipe(endWith(1)).collect(toArray());
    expect(res).toStrictEqual([1]);
  });

  test('should prepend the value', () => {
    const res = new Stream([1, 2, 3]).pipe(endWith(4)).collect(toArray());
    expect(res).toStrictEqual([1, 2, 3, 4]);
  });
});
