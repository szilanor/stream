import {runAsyncTestCases} from '../../utils/test-utils';
import {testCases} from './toRecord.spec';
import {toRecordAsync} from './toRecordAsync';

describe('toRecordAsync()', () =>
  runAsyncTestCases(
    toRecordAsync(
      entry => entry.toString(),
      entry => entry
    ),
    ...testCases
  ));
