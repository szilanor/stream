import {appendWith} from './appendWith';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {appendWithAsync} from './appendWithAsync';

describe('appendWith() and appendWithAsync()', () => {
  runSyncAndAsyncOperationTestCases(
    appendWith([4, 5], [6]),
    appendWithAsync([4, 5], [6]),
    [
      {
        input: [],
        result: [4, 5, 6],
      },
      {
        input: [1, 2, 3],
        result: [4, 5, 6, 1, 2, 3],
      },
    ]
  );
});
