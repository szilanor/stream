import {Stream} from '../../stream';
import {toRecord} from './toRecord';
import {empty} from '../../creators';
import {toRecordAsync} from './toRecordAsync';

describe('Processor function: toRecordAsync()', () => {
  test('should return an empty record for empty Stream', async () => {
    const res = await empty().collectAsync(
      toRecordAsync(
        () => '',
        () => ''
      )
    );
    expect(res).toStrictEqual({});
  });

  test('should return a record of the entries where the key is the entry as a string', async () => {
    const entries = [1, 2, 3, 4];
    const res = await new Stream(entries).collectAsync(
      toRecordAsync(
        entry => entry.toString(),
        entry => entry
      )
    );
    expect(res).toStrictEqual({
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
    });
  });

  test('should return a map of the entries with one element', () => {
    const entries = [1, 1, 1, 1];
    const res = new Stream(entries).collect(
      toRecord(
        entry => entry.toString(),
        entry => entry
      )
    );
    expect(res).toStrictEqual({
      '1': 1,
    });
  });
});
