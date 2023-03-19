import {all} from './all';

import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {allAsync} from './allAsync';

describe('all() and allAsync()', () => {
  runSyncAndAsyncCollectorTestCases(
    all(entry => !!entry),
    allAsync(entry => !!entry),
    [
      {
        input: [],
        result: true,
      },
    ]
  );
  runSyncAndAsyncCollectorTestCases(
    all(entry => entry % 2 === 1),
    allAsync(entry => entry % 2 === 1),
    [
      {
        input: [1, 1, 1],
        result: true,
      },
      {
        input: [1, 2, 1],
        result: false,
      },
    ]
  );
});
