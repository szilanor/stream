import {count} from './count';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {countAsync} from './countAsync';

describe('count() and countAsync()', () => {
  runSyncAndAsyncTestCases(count(), countAsync(), [
    {
      input: [],
      result: 0,
    },
    {
      input: [1],
      result: 1,
    },
    {
      input: new Set([1]),
      result: 1,
    },
  ]);
  runSyncAndAsyncTestCases(
    count(entry => entry % 2 === 0),
    countAsync(entry => entry % 2 === 0),
    [
      {
        input: [],
        result: 0,
      },
      {
        input: [1, 2, 3],
        result: 1,
      },
      {
        input: [1, 3, 5],
        result: 0,
      },
    ]
  );
});
