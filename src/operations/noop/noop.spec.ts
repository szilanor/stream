import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {noop} from './noop';

describe('Operation function: noop()', () => {
  test('should do nothing with the entries', () => {
    const res = new Stream([1, 2, 3]).pipe(noop()).collect(toArray());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
