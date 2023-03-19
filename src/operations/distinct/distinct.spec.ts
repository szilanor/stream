import {distinct} from './distinct';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {distinctAsync} from './distinctAsync';

describe('distinct() and distinctAsync()', () => {
  runSyncAndAsyncOperationTestCases(distinct(), distinctAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 1, 2, 2, 2, 3],
      result: [1, 2, 3],
    },
  ]);
});
