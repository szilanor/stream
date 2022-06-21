import {Stream} from '../../stream';
import {lastOrDefault} from './lastOrDefault';
import {empty} from '../../creators';

describe('Processor function: lastOrDefault()', () => {
  const entries = [1, 2, 3, 4];
  const onlyOdd = [1, 3];
  const isEven = (entry: number) => entry % 2 === 0;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const defaultValue: number = 5;

  test('should return the defaultValue for empty Stream', () => {
    const res = empty<number>().collect(
      lastOrDefault(defaultValue, () => true)
    );
    expect(res).toBe(defaultValue);
  });

  test('should return the last element without the callback', () => {
    const res = new Stream(entries).collect(lastOrDefault(defaultValue));
    expect(res).toBe(4);
  });

  test('should return the last even element', () => {
    const res = new Stream(entries).collect(
      lastOrDefault(defaultValue, isEven)
    );
    expect(res).toBe(4);
  });

  test('should return the defaultValue if the callback function returns false for every entry', () => {
    const res = new Stream(onlyOdd).collect(
      lastOrDefault(defaultValue, isEven)
    );
    expect(res).toBe(defaultValue);
  });
});
