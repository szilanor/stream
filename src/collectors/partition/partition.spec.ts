import {partition} from './partition';

import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {partitionAsync} from './partitionAsync';

describe('partition() and partitionAsync()', () => {
  runSyncAndAsyncCollectorTestCases(
    partition(entry => entry % 2 === 1),
    partitionAsync(entry => entry % 2 === 1),
    [
      {
        input: [],
        result: [[], []],
      },
      {
        input: [1, 1, 1],
        result: [[1, 1, 1], []],
      },
      {
        input: [1, 2, 1],
        result: [[1, 1], [2]],
      },
    ]
  );
});
