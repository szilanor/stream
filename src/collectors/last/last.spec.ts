import {Stream} from '../../stream';
import {last} from './last';
import {empty} from '../../creators';

describe('Processor function: last()', () => {
  const entries = [1, 2, 3, 4];
  const onlyOdd = [1, 3];
  const isEven = (entry: number) => entry % 2 === 0;

  test('should return undefined for empty Stream', () => {
    const res = empty().collect(last(() => true));
    expect(res).toBe(undefined);
  });

  test('should return the last element without the callback', () => {
    const res = new Stream(entries).collect(last());
    expect(res).toBe(4);
  });

  test('should return the last even element', () => {
    const res = new Stream(entries).collect(last(isEven));
    expect(res).toBe(4);
  });

  test('should return undefined if the callback function returns false for every entry', () => {
    const res = new Stream(onlyOdd).collect(last(isEven));
    expect(res).toBe(undefined);
  });
});
