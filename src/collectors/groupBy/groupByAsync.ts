import {AsyncCollectorFunction} from '../../types';

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupByAsync<T, TKey>(
  keySelector: (entry: T) => TKey
): AsyncCollectorFunction<T, Map<TKey, T[]>> {
  return async source => {
    const result: Map<TKey, T[]> = new Map<TKey, T[]>();
    for await (const entry of source) {
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
