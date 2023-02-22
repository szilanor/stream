import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {filter} from './filter';

describe('Operation function: filter()', () => {
  test('should keep entries if the callback function return with true', () => {
    const res = new Stream([1, 2, 3])
      .pipe(filter(entry => entry % 2 === 0))
      .collect(toArray());
    expect(res).toStrictEqual([2]);
  });
});
