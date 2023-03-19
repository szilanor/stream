import {join} from './join';
import {runSyncAndAsyncTestCases} from '../../utils/test-utils';
import {joinAsync} from './joinAsync';

describe('join() and joinAsync()', () => {
  runSyncAndAsyncTestCases(join(), joinAsync(), [
    {
      input: [],
      result: '',
    },
    {
      input: [1, 2, 3, 4],
      result: '1,2,3,4',
    },
  ]);
  runSyncAndAsyncTestCases(join(':'), joinAsync(':'), [
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
