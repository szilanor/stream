import {AsyncCollectorFunction} from '../../types';
import {EMPTY} from '../../utils';

/** Returns true if the AsyncIterable has 0 entry. */
export function isEmptyAsync<T>(): AsyncCollectorFunction<T, boolean> {
  return async source =>
    source === EMPTY ||
    (await source[Symbol.asyncIterator]().next()).done === true;
}
