import {ofType} from './ofType';
import {runSyncAndAsyncOperationTestCases} from '../../utils/test-utils';
import {ofTypeAsync} from './ofTypeAsync';

type A = {type: 'a'};
type B = {type: 'b'};
type AB = A | B;

function isA(entry: AB): entry is A {
  return entry.type === 'a';
}

describe('ofType() and ofTypeAsync()', () => {
  runSyncAndAsyncOperationTestCases(ofType(isA), ofTypeAsync(isA), [
    {
      input: [],
      result: [],
    },
    {
      input: [{type: 'a'}, {type: 'b'}, {type: 'a'}],
      result: [{type: 'a'}, {type: 'a'}],
    },
  ]);
});
