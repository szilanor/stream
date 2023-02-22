import {CollectorFunction} from '../../types';

/** Returns true if the Iterable has 0 entry. */
export function isEmpty<T>(): CollectorFunction<T, boolean> {
  return stream => stream[Symbol.iterator]().next().done === true;
}
