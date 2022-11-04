import {from, fromAsync} from './creators';
import {map, mapAsync, noop} from './operations';
import {all, groupBy, toArray, toArrayAsync} from './collectors';

describe('AsyncStream', () => {
  test('Pipe chaining', async () => {
    const input = [1, 2, 3, 4, 5];

    const res = await from(input)
      .toAsync()
      .pipe(mapAsync(async x => x))
      .collect(toArrayAsync());

    expect(res).toStrictEqual(input);
  });
});
