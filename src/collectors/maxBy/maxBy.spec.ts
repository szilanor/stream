import {maxBy} from './maxBy';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {maxByAsync} from './maxByAsync';

describe('maxBy() and maxByAsync()', () => {
  runSyncAndAsyncTestCases(
    maxBy((a, b) => a - b),
    maxByAsync((a, b) => a - b),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [1, 2, 3, 4],
        result: 4,
      },
      {
        input: [1, 2, 13, 4],
        result: 13,
      },
    ]
  );
  runSyncAndAsyncTestCases(
    maxBy((a, b) => a.a - b.a),
    maxByAsync((a, b) => a.a - b.a),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [{a: 4}, {a: 1}, {a: 2}, {a: 3}],
        result: {a: 4},
      },
    ]
  );
});
