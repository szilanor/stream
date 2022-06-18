import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {falsy} from './falsy';

describe('Operation function: falsy()', () => {
  test('should keep 0 as a falsy value', () => {
    const res = new Stream([0, 1, 2]).pipe(falsy()).collect(toArray());
    expect(res).toStrictEqual([0]);
  });

  test('should keep falsy values', () => {
    const falsyEntries = [false, '', 0, -0, null, undefined, NaN];
    const res = new Stream(falsyEntries).pipe(falsy()).collect(toArray());
    expect(res).toStrictEqual(falsyEntries);
  });
});
