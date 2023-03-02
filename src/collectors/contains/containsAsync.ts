import {AsyncCollectorFunction} from '../../types';
import {EqualsFunction} from '../../utils/util-types';

/** Returns if at least one of the entries equals with the given 'value'. */
export function containsAsync<T>(
  value: T,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b
): AsyncCollectorFunction<T, boolean> {
  return async source => {
    for await (const entry of source) {
      if (equalsFunction(entry, value)) {
        return true;
      }
    }
    return false;
  };
}

export const includesAsync = containsAsync;
