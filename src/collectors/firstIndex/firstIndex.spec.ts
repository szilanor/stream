import {Stream} from '../../stream';
import {firstIndex} from './firstIndex';
import {empty} from '../../creators';

describe('Processor function: firstIndex()', () => {
  const entries = [1, 2, 3, 4];
  const onlyOdd = [1, 3];
  const isEven = (entry: number) => entry % 2 === 0;

  test('should return -1 for empty Stream', () => {
    const res = empty().collect(firstIndex(() => true));
    expect(res).toBe(-1);
  });

  test('should return the index of the first element without the callback', () => {
    const res = new Stream(entries).collect(firstIndex());
    expect(res).toBe(0);
  });

  test('should return the index of the first even element', () => {
    const res = new Stream(entries).collect(firstIndex(isEven));
    expect(res).toBe(1);
  });

  test('should return -1 if the callback function returns false for every entry', () => {
    const res = new Stream(onlyOdd).collect(firstIndex(isEven));
    expect(res).toBe(-1);
  });
});
