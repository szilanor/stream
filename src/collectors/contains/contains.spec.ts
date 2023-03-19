import {contains} from './contains';

import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {containsAsync} from './containsAsync';

const testEntry = {test: 1};
const entries = [{test: 1}, {test: 2}];
const entriesWithReference = [testEntry, {test: 2}];

describe('contains() and containsAsync()', () => {
  runSyncAndAsyncCollectorTestCases(
    contains(testEntry),
    containsAsync(testEntry),
    [
      {
        input: [],
        result: false,
      },
      {
        input: entries,
        result: false,
      },
      {
        input: entriesWithReference,
        result: true,
      },
    ]
  );
  runSyncAndAsyncCollectorTestCases(
    contains(testEntry, (a, b) => a.test === b.test),
    containsAsync(testEntry, (a, b) => a.test === b.test),
    [
      {
        input: [],
        result: false,
      },
      {
        input: entries,
        result: true,
      },
      {
        input: entriesWithReference,
        result: true,
      },
    ]
  );
});
