import {isEmpty} from './isEmpty';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {isEmptyAsync} from './isEmptyAsync';

describe('isEmpty() and isEmptyAsync()', () => {
  runSyncAndAsyncTestCases(isEmpty(), isEmptyAsync(), [
    {
      input: [],
      result: true,
    },
    {
      input: [1, 2, 3, 4],
      result: false,
    },
  ]);
});
