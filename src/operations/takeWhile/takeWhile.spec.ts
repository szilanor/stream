import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {takeWhile} from './takeWhile';

describe('Operation function: takeWhile()', () => {
  test('should take while the callback function returns true', () => {
    const res = new Stream([1, 1, 1, 2, 3])
      .pipe(takeWhile(entry => entry % 2 === 1))
      .collect(toArray());
    expect(res).toStrictEqual([1, 1, 1]);
  });
});
