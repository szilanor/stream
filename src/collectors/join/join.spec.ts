import {join} from './join';
import {runSyncAndAsyncCollectorTestCases} from '../../utils/test-utils';
import {joinAsync} from './joinAsync';

describe('join() and joinAsync()', () => {
  runSyncAndAsyncCollectorTestCases(join(), joinAsync(), [
    {
      input: [],
      result: '',
    },
    {
      input: [1, 2, 3, 4],
      result: '1,2,3,4',
    },
  ]);
  runSyncAndAsyncCollectorTestCases(join(':'), joinAsync(':'), [
    {
      input: [],
      result: '',
    },
    {
      input: [1, 2, 3, 4],
      result: '1:2:3:4',
    },
  ]);
});
