import {lastIndex} from './lastIndex';
import {stream} from '../../creators';

describe('Processor function: lastIndex()', () => {
  const entries = [1, 2, 3, 4];
  const onlyOdd = [1, 3];
  const isEven = (entry: number) => entry % 2 === 0;

  test('should return -1 for empty Stream', () => {
    const res = stream().collect(lastIndex(() => true));
    expect(res).toBe(-1);
  });

  test('should return the index of the last element without the callback', () => {
    const res = stream(entries).collect(lastIndex());
    expect(res).toBe(3);
  });

  test('should return the index of the last even element', () => {
    const res = stream(entries).collect(lastIndex(isEven));
    expect(res).toBe(3);
  });

  test('should return -1 if the callback function returns false for every entry', () => {
    const res = stream(onlyOdd).collect(lastIndex(isEven));
    expect(res).toBe(-1);
  });
});
