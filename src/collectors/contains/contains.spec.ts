import {contains} from './contains';
import {stream} from '../../creators';

describe('Processor function: contains()', () => {
  const testEntry = {test: 1};
  const entries = [{test: 1}, {test: 2}];

  test('should return false for empty Stream', () => {
    const res = stream().collect(contains(testEntry as unknown));
    expect(res).toBe(false);
  });

  test('should return false with the default reference comparer', () => {
    const res = stream(entries).collect(contains(testEntry));
    expect(res).toBe(false);
  });

  test('should return true with the custom comparer', () => {
    const res = stream(entries).collect(
      contains(testEntry, (a, b) => a.test === b.test)
    );
    expect(res).toBe(true);
  });
});
