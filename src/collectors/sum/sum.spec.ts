import {sum} from './sum';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {sumAsync} from './sumAsync';

describe('sum() and sumAsync()', () => {
  runSyncAndAsyncCollectorTestCases(sum(), sumAsync(), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 10,
    },
  ]);
});
