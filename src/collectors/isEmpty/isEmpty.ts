import {CollectorFunction} from '../../types';
import {EMPTY} from '../../utils';

/** Returns true if the Iterable has 0 entry. */
export function isEmpty<T>(): CollectorFunction<T, boolean> {
  return source =>
    source === EMPTY || source[Symbol.iterator]().next().done === true;
}
