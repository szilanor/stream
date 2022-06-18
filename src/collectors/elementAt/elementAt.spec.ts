import {Stream} from '../../stream';
import {elementAt} from './elementAt';
import {empty} from '../../creators';

describe('Processor function: elementAt()', () => {
  test('should return undefined for empty Stream', () => {
    const res = empty().collect(elementAt(0));
    expect(res).toBe(undefined);
  });

  test('should return the first element', () => {
    const res = new Stream([1]).collect(elementAt(0));
    expect(res).toBe(1);
  });

  test('should return undefined if the index is greater then the length of the iterable', () => {
    const res = new Stream([1]).collect(elementAt(1));
    expect(res).toBe(undefined);
  });
});
