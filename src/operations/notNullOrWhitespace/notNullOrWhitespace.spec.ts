import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {notNullOrWhitespace} from './notNullOrWhitespace';
import {notNullOrWhitespaceAsync} from './notNullOrWhitespaceAsync';

describe('notNullOrWhitespace() and notNullOrWhitespaceAsync()', () => {
  runSyncAndAsyncOperationTestCases(
    notNullOrWhitespace(),
    notNullOrWhitespaceAsync(),
    [
      {
        input: [],
        result: [],
      },
      {
        input: ['1', '   ', '2', undefined],
        result: ['1', '2'],
      },
    ]
  );
});
