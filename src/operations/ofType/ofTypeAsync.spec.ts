import {AsyncStream} from '../../async-stream';
import {toArrayAsync} from '../../collectors';
import {ofTypeAsync} from './ofTypeAsync';

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

    const res = new AsyncStream(entries).pipeAsync(ofTypeAsync(isA));

    const res1: A[] = await res.collectAsync(toArrayAsync());
    const res2: A[] = await res.collectAsync(toArrayAsync());

    expect(res1).toStrictEqual(expected);
    expect(res1).toStrictEqual(res2);
  });
});
