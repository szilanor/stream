import {groupByRecord} from './groupByRecord';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {groupByRecordAsync} from './groupByRecordAsync';

describe('groupByRecord() and groupByRecordAsync()', () => {
  runSyncAndAsyncTestCases(
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
