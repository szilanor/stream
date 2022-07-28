import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {notNullOrWhitespace} from './notNullOrWhitespace';

describe('Operation function: notNullOrWhitespace()', () => {
  test('should filter null or undefined or whitespace entries', () => {
    const res = new Stream(['1', '   ', '2', undefined])
      .pipe(notNullOrWhitespace())
      .collect(toArray());
    expect(res).toStrictEqual(['1', '2']);
  });
});
