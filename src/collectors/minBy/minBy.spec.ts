import {minBy} from './minBy';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {minByAsync} from './minByAsync';

describe('minBy() and minByAsync()', () => {
  runSyncAndAsyncCollectorTestCases(
    minBy((a, b) => a - b),
    minByAsync((a, b) => a - b),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [1, 2, 3, 4],
        result: 1,
      },
      {
        input: [1, 2, 13, 4, 0],
        result: 0,
      },
    ]
  );
  runSyncAndAsyncCollectorTestCases(
    minBy((a, b) => a.a - b.a),
    minByAsync((a, b) => a.a - b.a),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [{a: 4}, {a: 1}, {a: 2}, {a: 3}],
        result: {a: 1},
      },
    ]
  );
});
