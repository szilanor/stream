import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {map} from './map';

describe('Operation function: map()', () => {
  test('should map entries with the callback function', () => {
    const res = new Stream([1, 2, 3]).pipe(map(entry => entry + 1));

    const res1 = res.collect(toArray());
    const res2 = res.collect(toArray());

    expect(res1).toStrictEqual([2, 3, 4]);
    expect(res2).toStrictEqual(res1);
  });

  test('proto should map entries with the callback function', () => {
    const res = new Stream([1, 2, 3]).map(entry => entry + 1);

    const res1 = res.collect(toArray());
    const res2 = res.collect(toArray());

    expect(res1).toStrictEqual([2, 3, 4]);
    expect(res2).toStrictEqual(res1);
  });
});
