import {Stream} from '../../stream';
import {join} from './join';
import {empty} from '../../creators';

describe('Processor function: join()', () => {
  test('should return an empty string for empty Stream', () => {
    const res = empty().collect(join());
    expect(res).toBe('');
  });

  test('should join the entries with the default separator', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(join());
    expect(res).toBe('1,2,3,4');
  });

  test('should join the entries with the passed separator', () => {
    const entries = [1, 2, 3, 4];
    const res = new Stream(entries).collect(join(':'));
    expect(res).toBe('1:2:3:4');
  });
});
