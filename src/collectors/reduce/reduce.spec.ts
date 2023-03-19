import {reduce} from './reduce';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {reduceAsync} from './reduceAsync';

describe('reduce() and reduceAsync()', () => {
  const testCases = [
    {
      input: [],
      result: 0,
    },
    {
      input: [1, 2, 3, 4],
      result: 10,
    },
  ];

  runSyncAndAsyncTestCases(
    reduce((a, b) => a + b, 0),
    reduceAsync((a, b) => a + b, 0),
    testCases
  );

  runSyncAndAsyncTestCases(
    reduce(
      (a, b) => a + b,
      () => 0
    ),
    reduceAsync(
      (a, b) => a + b,
      () => 0
    ),
    testCases
  );
});
