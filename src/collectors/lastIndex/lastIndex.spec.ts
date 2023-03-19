import {lastIndex} from './lastIndex';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {lastIndexAsync} from './lastIndexAsync';

describe('lastIndex() and lastIndexAsync()', () => {
  runSyncAndAsyncTestCases(lastIndex(), lastIndexAsync(), [
    {
      input: [],
      result: -1,
    },
    {
      input: [1, 2, 3, 4],
      result: 3,
    },
  ]);
  runSyncAndAsyncTestCases(
    lastIndex(entry => entry % 2 === 0),
    lastIndexAsync(entry => entry % 2 === 0),
    [
      {
        input: [],
        result: -1,
      },
      {
        input: [1, 2, 3, 4, 5],
        result: 3,
      },
      {
        input: [1, 3, 5],
        result: -1,
      },
    ]
  );
});
