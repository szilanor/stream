import {concatWith} from './concatWith';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {concatWithAsync} from './concatWithAsync';

describe('concatWith() and concatWithAsync()', () => {
  runSyncAndAsyncOperationTestCases(
    concatWith([4, 5], [6]),
    concatWithAsync([4, 5], [6]),
    [
      {
        input: [],
        result: [4, 5, 6],
      },
      {
        input: [1, 2, 3],
        result: [1, 2, 3, 4, 5, 6],
      },
    ]
  );
});
