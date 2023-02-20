import {streamOf} from './stream-of';
import {toArray} from '../../collectors';

describe('Creator function: of()', () => {
  test('should return an empty Stream', () => {
    const res = streamOf().collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test('should return a Stream with the parameter entries', () => {
    const res = streamOf(1, 2, 3).collect(toArray());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
