import {groupByRecord} from './groupByRecord';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {groupByRecordAsync} from './groupByRecordAsync';

describe('groupByRecord() and groupByRecordAsync()', () => {
  runSyncAndAsyncCollectorTestCases(
    groupByRecord(entry => (entry % 2 === 0 ? 'even' : 'odd')),
    groupByRecordAsync(entry => (entry % 2 === 0 ? 'even' : 'odd')),
    [
      {
        input: [],
        result: {},
      },
      {
        input: [1, 2, 3, 4],
        result: {
          odd: [1, 3],
          even: [2, 4],
        },
      },
    ]
  );
});
