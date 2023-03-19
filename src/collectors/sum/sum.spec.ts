import {sum} from './sum';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {sumAsync} from './sumAsync';

describe('sum() and sumAsync()', () => {
  runSyncAndAsyncTestCases(sum(), sumAsync(), [
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
