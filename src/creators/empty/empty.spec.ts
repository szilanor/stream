import {empty} from './empty';
import {toArray} from '../../collectors';

describe('Creator function: empty()', () => {
  test('should return empty Stream', () => {
    const res = empty().collect(toArray());
    expect(res).toStrictEqual([]);
  });
});
