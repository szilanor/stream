import {elementAt} from './elementAt';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {elementAtAsync} from './elementAtAsync';

describe('elementAt() and elementAtAsync()', () => {
  runSyncAndAsyncTestCases(elementAt(0), elementAtAsync(0), [
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
  runSyncAndAsyncTestCases(elementAt(1), elementAtAsync(1), [
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
