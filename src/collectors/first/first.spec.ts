import {first} from './first';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {firstAsync} from './firstAsync';

describe('first() and firstAsync()', () => {
  runSyncAndAsyncCollectorTestCases(first(), firstAsync(), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 1,
    },
  ]);
  runSyncAndAsyncCollectorTestCases(
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
