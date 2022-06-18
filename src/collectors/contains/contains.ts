import {CollectorFunction} from '../../types';

/** Returns if at least one of the entries equals with the given 'value'. */
export function contains<T>(
  value: T,
  compareFunction: (a: T, b: T) => boolean = (a, b) => a === b
): CollectorFunction<T, boolean> {
  return stream => {
    for (const entry of stream) {
      if (compareFunction(entry, value)) {
        return true;
      }
    }
    return false;
  };
}
