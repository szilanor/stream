import {endWith} from './endWith';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {endWithAsync} from './endWithAsync';

describe('endWith() and endWithAsync()', () => {
  runSyncAndAsyncOperationTestCases(endWith(1), endWithAsync(1), [
    {
      input: [],
      result: [1],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3, 1],
    },
  ]);
});
