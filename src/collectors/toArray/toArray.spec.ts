import {toArray} from './toArray';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {toArrayAsync} from './toArrayAsync';

describe('toArray() and toArrayAsync()', () => {
  runSyncAndAsyncTestCases(toArray(), toArrayAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, 4],
      result: [1, 2, 3, 4],
    },
    {
      input: new Set<number>(),
      result: [],
    },
  ]);
});
