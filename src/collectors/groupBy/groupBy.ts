import {CollectorFunction} from '../../types';

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupBy<T, TKey>(
  keySelector: (entry: T) => TKey
): CollectorFunction<T, Map<TKey, T[]>> {
  return source => {
    const result: Map<TKey, T[]> = new Map<TKey, T[]>();
    for (const entry of source) {
      const key = keySelector(entry);
      const value = result.get(key);
      if (value) {
        value.push(entry);
      } else {
        result.set(key, [entry]);
      }
    }
    return result;
  };
}
