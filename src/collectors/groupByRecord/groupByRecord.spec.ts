import {Stream} from '../../stream';
import {groupByRecord} from './groupByRecord';
import {empty} from '../../creators';

describe('Processor function: groupByRecord()', () => {
  test('should return an empty Map for empty Stream', () => {
    const res = empty().collect(groupByRecord(() => 'empty'));
    expect(res).toStrictEqual({});
  });

  test('should create groups based on the callback function', () => {
    const entries = [1, 2, 3, 4];
    const expected = {
      odd: [1, 3],
      even: [2, 4],
    };
    const evenOdd = (entry: number) => (entry % 2 === 0 ? 'even' : 'odd');

    const res = new Stream(entries).collect(groupByRecord(evenOdd));
    expect(res).toStrictEqual(expected);
  });
});
