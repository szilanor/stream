import {CollectorFunction} from '../../types';
import {reduce} from '../reduce';

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupBy<T, TKey>(
  keySelector: (entry: T) => TKey
): CollectorFunction<T, Map<TKey, T[]>> {
  return reduce(
    (result, entry) => {
      const key = keySelector(entry);
      const value = result.get(key);
      if (value) {
        value.push(entry);
      } else {
        return result.set(key, [entry]);
      }
      return result;
    },
    () => new Map<TKey, T[]>()
  );
}
