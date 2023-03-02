import {AsyncCollectorFunction} from '../../types';

/** Returns true if the AsyncIterable has 0 entry. */
export function isEmptyAsync<T>(): AsyncCollectorFunction<T, boolean> {
  return async source =>
    (await source[Symbol.asyncIterator]().next()).done === true;
}
