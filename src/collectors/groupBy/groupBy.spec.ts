import {groupBy} from './groupBy';
import {stream} from '../../creators';

describe('Processor function: groupBy()', () => {
  test('should return an empty Map for empty Stream', () => {
    const res = stream().collect(groupBy(() => 'empty'));
    expect(res).toStrictEqual(new Map<string, unknown[]>());
  });

  test('should create groups based on the callback function', () => {
    const entries = [1, 2, 3, 4];
    const expected = new Map<string, number[]>([
      ['odd', [1, 3]],
      ['even', [2, 4]],
    ]);
    const evenOdd = (entry: number) => (entry % 2 === 0 ? 'even' : 'odd');

    const res = stream(entries).collect(groupBy(evenOdd));
    expect(res).toStrictEqual(expected);
  });
});
