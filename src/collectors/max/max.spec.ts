import {max} from './max';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {maxAsync} from './maxAsync';

describe('max and maxAsync', () => {
  runSyncAndAsyncTestCases(max, maxAsync, [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 4,
    },
    {
      input: [1, 2, 13, 4],
      result: 13,
    },
  ]);
});
