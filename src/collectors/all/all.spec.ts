import {all} from './all';

import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {allAsync} from './allAsync';

describe('all() and allAsync()', () => {
  runSyncAndAsyncTestCases(
    all(entry => !!entry),
    allAsync(entry => !!entry),
    [
      {
        input: [],
        result: true,
      },
    ]
  );
  runSyncAndAsyncTestCases(
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
