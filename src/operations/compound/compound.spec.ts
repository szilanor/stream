import {compound} from './compound';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {compoundAsync} from './compoundAsync';
import {filter, filterAsync} from '../filter';
import {map, mapAsync} from '../map';

describe('compound() and compoundAsync()', () => {
  runSyncAndAsyncOperationTestCases(
    compound(
      filter(x => x % 2 === 0),
      map(x => x + 1),
      map(x => x * 2)
    ),
    compoundAsync(
      filterAsync(x => x % 2 === 0),
      mapAsync(x => x + 1),
      mapAsync(x => x * 2)
    ),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [1, 2, 3],
        result: [6],
      },
    ]
  );
});
