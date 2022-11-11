import {from} from './creators';
import {toArrayAsync} from './collectors';
import {mapAsync} from './operations/map/mapAsync';

describe('AsyncStream', () => {
  test('Pipe chaining', async () => {
    const input = [1, 2, 3, 4, 5];

    const res = await from(input)
      .pipeAsync(mapAsync(async x => x))
      .collectAsync(toArrayAsync());

    expect(res).toStrictEqual(input);
  });
});
