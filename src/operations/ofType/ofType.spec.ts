import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {ofType} from './ofType';

type A = {type: 'a'};
type B = {type: 'b'};
type AB = A | B;

function isA(entry: AB): entry is A {
  return entry.type === 'a';
}

describe('Operation function: ofType()', () => {
  test('should filter and cast based on the type guard parameter function', () => {
    const entries: AB[] = [{type: 'a'}, {type: 'b'}, {type: 'a'}];
    const expected: A[] = [{type: 'a'}, {type: 'a'}];
    const res: A[] = new Stream(entries).pipe(ofType(isA)).collect(toArray());
    expect(res).toStrictEqual(expected);
  });
});
