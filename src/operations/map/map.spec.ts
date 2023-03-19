import {map} from './map';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {mapAsync} from './mapAsync';

describe('map() and mapAsync()', () => {
  runSyncAndAsyncOperationTestCases(
    map(entry => entry + 1),
    mapAsync(entry => entry + 1),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [1, 2, 3],
        result: [2, 3, 4],
      },
    ]
  );
});
