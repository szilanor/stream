import {any} from './any';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {anyAsync} from './anyAsync';

describe('any() and anyAsync()', () => {
  runSyncAndAsyncCollectorTestCases(
    any(entry => !!entry),
    anyAsync(entry => !!entry),
    [
      {
        input: [],
        result: false,
      },
    ]
  );
  runSyncAndAsyncCollectorTestCases(any(), anyAsync(), [
    {
      input: [1],
      result: true,
    },
    {
      input: [],
      result: false,
    },
  ]);
  runSyncAndAsyncCollectorTestCases(
    any(entry => entry % 2 === 1),
    anyAsync(entry => entry % 2 === 1),
    [
      {
        input: [1, 1, 1],
        result: true,
      },
      {
        input: [2, 2, 2],
        result: false,
      },
    ]
  );
});
