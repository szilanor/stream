import {first} from './first';
import {stream} from '../../creators';

describe('Processor function: first()', () => {
  const entries = [1, 2, 3, 4];
  const onlyOdd = [1, 3];
  const isEven = (entry: number) => entry % 2 === 0;

  test('should return undefined for empty Stream', () => {
    const res = stream().collect(first(() => true));
    expect(res).toBe(undefined);
  });

  test('should return the first element without the callback', () => {
    const res = stream(entries).collect(first());
    expect(res).toBe(1);
  });

  test('should return the first even element', () => {
    const res = stream(entries).collect(first(isEven));
    expect(res).toBe(2);
  });

  test('should return undefined if the callback function returns false for every entry', () => {
    const res = stream(onlyOdd).collect(first(isEven));
    expect(res).toBe(undefined);
  });
});
