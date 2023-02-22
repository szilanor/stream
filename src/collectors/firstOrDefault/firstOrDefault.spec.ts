import {firstOrDefault} from './firstOrDefault';
import {stream} from '../../creators';

describe('Processor function: firstOrDefault()', () => {
  const entries = [1, 2, 3, 4];
  const onlyOdd = [1, 3];
  const isEven = (entry: number) => entry % 2 === 0;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const defaultValue: number = 5;

  test('should return defaultValue for empty Stream', () => {
    const res = stream<number>().collect(
      firstOrDefault(defaultValue, () => true)
    );
    expect(res).toBe(defaultValue);
  });

  test('should return the first element without the callback', () => {
    const res = stream(entries).collect(firstOrDefault(defaultValue));
    expect(res).toBe(1);
  });

  test('should return the first even element', () => {
    const res: number = stream(entries).collect(
      firstOrDefault(defaultValue, isEven)
    );
    expect(res).toBe(2);
  });

  test('should return the defaultValue if the callback function returns false for every entry', () => {
    const res = stream(onlyOdd).collect(firstOrDefault(defaultValue, isEven));
    expect(res).toBe(defaultValue);
  });
});
