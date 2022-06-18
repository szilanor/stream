import {Stream} from '../../stream';
import {lastIndex} from './lastIndex';
import {empty} from '../../creators';

describe('Processor function: lastIndex()', () => {
  const entries = [1, 2, 3, 4];
  const onlyOdd = [1, 3];
  const isEven = (entry: number) => entry % 2 === 0;

  test('should return -1 for empty Stream', () => {
    const res = empty().collect(lastIndex(() => true));
    expect(res).toBe(-1);
  });

  test('should return the index of the last element without the callback', () => {
    const res = new Stream(entries).collect(lastIndex());
    expect(res).toBe(3);
  });

  test('should return the index of the last even element', () => {
    const res = new Stream(entries).collect(lastIndex(isEven));
    expect(res).toBe(3);
  });

  test('should return -1 if the callback function returns false for every entry', () => {
    const res = new Stream(onlyOdd).collect(lastIndex(isEven));
    expect(res).toBe(-1);
  });
});
