import {toArrayAsync} from '../../collectors';
import {ofTypeAsync} from './ofTypeAsync';
import {Stream} from '../../stream';

type A = {type: 'a'};
type B = {type: 'b'};
type AB = A | B;

function isA(entry: AB): entry is A {
  return entry.type === 'a';
}

describe('Operation function: ofTypeAsync()', () => {
  test('should filter and cast based on the type guard parameter function', async () => {
    const entries: AB[] = [{type: 'a'}, {type: 'b'}, {type: 'a'}];
    const expected: A[] = [{type: 'a'}, {type: 'a'}];

    const res = await new Stream(entries)
      .pipeAsync(ofTypeAsync(isA))
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual(expected);
  });
});
