import {falsy} from './falsy';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {falsyAsync} from './falsyAsync';

describe('falsy() and falsyAsync()', () => {
  runSyncAndAsyncOperationTestCases<unknown, unknown>(falsy(), falsyAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, false, '', 0, -0, null, undefined, NaN],
      result: [false, '', 0, -0, null, undefined, NaN],
    },
  ]);
});
