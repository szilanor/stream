import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {flatAsync} from './flatAsync';
import {flat} from './flat';

describe('flat() and flatAsync()', () => {
  runSyncAndAsyncOperationTestCases(flat(), flatAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [[1, 2, 3], [], [4], [5, 6], new Set([7])],
      result: [1, 2, 3, 4, 5, 6, 7],
    },
  ]);
});
