import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {distinctUntilKeyChanged} from './distinctUntilKeyChanged';
import {distinctUntilKeyChangedAsync} from './distinctUntilKeyChangedAsync';

describe('distinct() and distinctAsync()', () => {
  runSyncAndAsyncOperationTestCases(
    distinctUntilKeyChanged('a'),
    distinctUntilKeyChangedAsync('a'),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [{a: 1}, {a: 1}, {a: 2}, {a: 2}, {a: 2}, {a: 3}, {a: 1}],
        result: [{a: 1}, {a: 2}, {a: 3}, {a: 1}],
      },
    ]
  );
  runSyncAndAsyncOperationTestCases(
    distinctUntilKeyChanged('b', (a, b) => a.a === b.a),
    distinctUntilKeyChangedAsync('b', (a, b) => a.a === b.a),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [
          {b: {a: 1}},
          {b: {a: 1}},
          {b: {a: 2}},
          {b: {a: 2}},
          {b: {a: 2}},
          {b: {a: 3}},
          {b: {a: 1}},
        ],
        result: [{b: {a: 1}}, {b: {a: 2}}, {b: {a: 3}}, {b: {a: 1}}],
      },
    ]
  );
});
