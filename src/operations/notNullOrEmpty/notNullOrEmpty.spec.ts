import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {notNullOrEmpty} from './notNullOrEmpty';

describe('Operation function: notNullOrEmpty()', () => {
  test('should filter null or undefined or empty entries', () => {
    const res = new Stream(['1', '', '2', [], [1], null, undefined])
      .pipe(notNullOrEmpty())
      .collect(toArray());
    expect(res).toStrictEqual(['1', '2', [1]]);
  });
});
