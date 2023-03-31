import {sequenceEquals} from './sequenceEquals';

import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {sequenceEqualsAsync} from './sequenceEqualsAsync';

describe('sequenceEquals() and sequenceEqualsAsync()', () => {
  runSyncAndAsyncCollectorTestCases(
    sequenceEquals<number>([]),
    sequenceEqualsAsync<number>([]),
    [
      {
        input: [],
        result: true,
      },
      {
        input: [1, 2, 3],
        result: true,
      },
    ]
  );
  runSyncAndAsyncCollectorTestCases(
    sequenceEquals([1, 2, 3]),
    sequenceEqualsAsync([1, 2, 3]),
    [
      {
        input: [],
        result: false,
      },
      {
        input: [1, 2, 3],
        result: true,
      },
      {
        input: [1, 2, 5, 3],
        result: false,
      },
    ]
  );
  runSyncAndAsyncCollectorTestCases(
    sequenceEquals(new Set([1, 2, 3])),
    sequenceEqualsAsync(new Set([1, 2, 3])),
    [
      {
        input: [],
        result: false,
      },
      {
        input: [1, 2, 3],
        result: true,
      },
      {
        input: [1, 2, 5, 3],
        result: false,
      },
    ]
  );

  const input = [{a: 1}, {a: 1}, {a: 2}, {a: 2}, {a: 2}, {a: 3}, {a: 1}];
  runSyncAndAsyncCollectorTestCases(
    sequenceEquals(input),
    sequenceEqualsAsync(input),
    [
      {
        input: [],
        result: false,
      },
      {
        input: input,
        result: true,
      },
      {
        input: [{a: 1}, {a: 1}, {a: 2}, {a: 2}, {a: 2}, {a: 3}, {a: 1}],
        result: false,
      },
    ]
  );
  runSyncAndAsyncCollectorTestCases(
    sequenceEquals(input, (a, b) => a.a === b.a),
    sequenceEqualsAsync(input, (a, b) => a.a === b.a),
    [
      {
        input: [],
        result: false,
      },
      {
        input: input,
        result: true,
      },
      {
        input: [{a: 1}, {a: 1}, {a: 2}, {a: 2}, {a: 2}, {a: 3}, {a: 1}],
        result: true,
      },
    ]
  );
});
