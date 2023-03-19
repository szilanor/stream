import {any} from './any';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {anyAsync} from './anyAsync';

describe('any() and anyAsync()', () => {
  runSyncAndAsyncTestCases(
    any(entry => !!entry),
    anyAsync(entry => !!entry),
    [
      {
        input: [],
        result: false,
      },
    ]
  );
  runSyncAndAsyncTestCases(any(), anyAsync(), [
    {
      input: [1],
      result: true,
    },
    {
      input: [],
      result: false,
    },
  ]);
  runSyncAndAsyncTestCases(
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
