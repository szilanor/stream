import {lastIndex} from './lastIndex';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {lastIndexAsync} from './lastIndexAsync';

describe('lastIndex() and lastIndexAsync()', () => {
  runSyncAndAsyncCollectorTestCases(lastIndex(), lastIndexAsync(), [
    {
      input: [],
      result: -1,
    },
    {
      input: [1, 2, 3, 4],
      result: 3,
    },
  ]);
  runSyncAndAsyncCollectorTestCases(
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
