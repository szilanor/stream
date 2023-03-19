import {reduce} from './reduce';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
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

  runSyncAndAsyncCollectorTestCases(
    reduce((a, b) => a + b, 0),
    reduceAsync((a, b) => a + b, 0),
    testCases
  );

  runSyncAndAsyncCollectorTestCases(
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
