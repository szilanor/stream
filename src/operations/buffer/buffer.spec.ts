import {buffer} from './buffer';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {bufferAsync} from './bufferAsync';

describe('buffer() and bufferAsync()', () => {
  runSyncAndAsyncOperationTestCases(buffer(2), bufferAsync(2), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, 4, 5, 6, 7],
      result: [[1, 2], [3, 4], [5, 6], [7]],
    },
  ]);
});
