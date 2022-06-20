import {from} from './creators';
import {distinct, map, noop} from './operations';
import {all, groupBy, toArray} from './collectors';

describe('Stream', () => {
  test('More readable code example', () => {
    const input = [1, 1, 1, 1, 2, 3, 4, 4, 5];

    const resultClassic: Map<string, number[]> = new Map<string, number[]>();
    Array.from(new Set<number>(input)).forEach(x => {
      const key = x % 2 === 0 ? 'even' : 'odd';
      resultClassic.set(key, [...(resultClassic.get(key) || []), x]);
    });

    const resultStreamApi: Map<string, number[]> = from(input)
      .pipe(distinct())
      .collect(groupBy(x => (x % 2 === 0 ? 'even' : 'odd')));

    expect(resultClassic).toStrictEqual(resultStreamApi);
  });

  test('Less comparison example', () => {
    const input = [1, 2, 3, 4, 5];

    const allEvenClassic: boolean = input
      .map(x => x + 1)
      .every(x => x % 2 === 0);

    const allEvenStreamApi: boolean = from(input)
      .pipe(map(x => x + 1))
      .collect(all(x => x % 2 === 0));

    expect(allEvenClassic).toStrictEqual(allEvenStreamApi);
  });

  test('Pipe chaining', () => {
    const input = [1, 2, 3, 4, 5];

    const res = from(input)
      .pipe(
        noop(),
        noop(),
        noop(),
        noop(),
        map(x => x + 1),
        map(x => x - 1)
      )
      .collect(toArray());

    expect(res).toStrictEqual(input);
  });
});
