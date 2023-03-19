import {first} from './first';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {firstAsync} from './firstAsync';

describe('first() and firstAsync()', () => {
  runSyncAndAsyncTestCases(first(), firstAsync(), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 1,
    },
  ]);
  runSyncAndAsyncTestCases(
    first(entry => entry % 2 === 0),
    firstAsync(entry => entry % 2 === 0),
    [
      {
        input: [1, 2, 3, 4],
        result: 2,
      },
      {
        input: [1, 3],
        result: undefined,
      },
    ]
  );
});
