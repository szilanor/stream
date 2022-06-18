import {Stream} from '../../stream';
import {toArray} from '../../collectors';
import {compound} from './compound';
import {filter} from '../filter/filter';
import {map} from '../map/map';

describe('Operation function: compound()', () => {
  test('should pipe multiple operation functions', () => {
    const res = new Stream([1, 2, 3])
      .pipe(
        compound(
          filter(x => x % 2 === 0),
          map(x => x + 1),
          map(x => x * 2)
        )
      )
      .collect(toArray());
    expect(res).toStrictEqual([6]);
  });

  test('should pipe do nothing with the entries without operations', () => {
    const res = new Stream([1, 2, 3]).pipe(compound()).collect(toArray());
    expect(res).toStrictEqual([1, 2, 3]);
  });
});
