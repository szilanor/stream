import {last} from './last';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {lastAsync} from './lastAsync';

describe('last() and lastAsync()', () => {
  runSyncAndAsyncTestCases(last(), lastAsync(), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 4,
    },
  ]);
  runSyncAndAsyncTestCases(
    last(entry => entry % 2 === 0),
    lastAsync(entry => entry % 2 === 0),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [1, 2, 3, 4, 5],
        result: 4,
      },
      {
        input: [1, 3, 5],
        result: undefined,
      },
    ]
  );
});
