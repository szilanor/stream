import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {map} from './map';

describe('Operation function: map()', () => {
  test('should map entries with the callback function', () => {
    const res = new Stream([1, 2, 3])
      .pipe(map(entry => entry + 1))
      .collect(toArray());
    expect(res).toStrictEqual([2, 3, 4]);
  });
});
