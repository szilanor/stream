import {elementAt} from './elementAt';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {elementAtAsync} from './elementAtAsync';

describe('elementAt() and elementAtAsync()', () => {
  runSyncAndAsyncCollectorTestCases(elementAt(0), elementAtAsync(0), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1],
      result: 1,
    },
    {
      input: new Set([1]),
      result: 1,
    },
  ]);
  runSyncAndAsyncCollectorTestCases(elementAt(1), elementAtAsync(1), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1],
      result: undefined,
    },
  ]);
});
