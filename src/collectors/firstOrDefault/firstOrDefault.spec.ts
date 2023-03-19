import {firstOrDefault} from './firstOrDefault';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {firstOrDefaultAsync} from './firstOrDefaultAsync';

describe('firstOrDefault() and firstOrDefaultAsync()', () => {
  const emptyTestCases = [
    {
      input: [],
      result: 5,
    },
    {
      input: [1, 2, 3, 4],
      result: 1,
    },
  ];

  runSyncAndAsyncTestCases(
    firstOrDefault(5),
    firstOrDefaultAsync(5),
    emptyTestCases
  );
  runSyncAndAsyncTestCases(
    firstOrDefault(() => 5),
    firstOrDefaultAsync(() => 5),
    emptyTestCases
  );

  const evenTestCases = [
    {
      input: [],
      result: 5,
    },
    {
      input: [1, 2, 3, 4],
      result: 2,
    },
    {
      input: [1, 3],
      result: 5,
    },
  ];

  runSyncAndAsyncTestCases(
    firstOrDefault(5, entry => entry % 2 === 0),
    firstOrDefaultAsync(5, entry => entry % 2 === 0),
    evenTestCases
  );
  runSyncAndAsyncTestCases(
    firstOrDefault(
      () => 5,
      entry => entry % 2 === 0
    ),
    firstOrDefaultAsync(
      () => 5,
      entry => entry % 2 === 0
    ),
    evenTestCases
  );
});
