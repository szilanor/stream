import {CollectorFunction} from '../../types';
import {EqualsFunction} from '../../utils';

/** Returns if at least one of the entries equals with the given 'value'. */
export function contains<T>(
  value: T,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b
): CollectorFunction<T, boolean> {
  return source => {
    for (const entry of source) {
      if (equalsFunction(entry, value)) {
        return true;
      }
    }
    return false;
  };
}

export const includes = contains;
