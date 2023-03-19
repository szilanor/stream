import {max} from './max';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {maxAsync} from './maxAsync';

describe('max and maxAsync', () => {
  runSyncAndAsyncCollectorTestCases(max, maxAsync, [
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
