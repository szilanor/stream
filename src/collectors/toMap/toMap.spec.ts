import {Stream} from '../../stream';
import {toMap} from './toMap';
import {empty} from '../../creators';

describe('Processor function: toMap()', () => {
  test('should return an empty map for empty Stream', () => {
    const res = empty().collect(
      toMap(
        () => '',
        () => ''
      )
    );
    expect(res).toStrictEqual(new Map<string, string>());
  });

  test('should return a map of the entries where the key is the entry as a string', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(
      toMap(
        entry => entry.toString(),
        entry => entry
      )
    );
    expect(res).toStrictEqual(
      new Map<string, number>([
        ['1', 1],
        ['2', 2],
        ['3', 3],
        ['4', 4],
      ])
    );
  });

  test('should return a map of the entries with one element', () => {
    const entries = [1, 1, 1, 1];
    const res = new Stream(entries).collect(
      toMap(
        entry => entry.toString(),
        entry => entry
      )
    );
    expect(res).toStrictEqual(new Map<string, number>([['1', 1]]));
  });
});
