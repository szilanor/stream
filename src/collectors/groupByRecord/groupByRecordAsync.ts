import {AsyncCollectorFunction} from '../../types';

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupByRecordAsync<T, TKey extends string | number | symbol>(
  keySelector: (entry: T) => TKey
): AsyncCollectorFunction<T, Record<TKey, T[]>> {
  return async source => {
    const result = {} as Record<TKey, T[]>;
    for await (const entry of source) {
      const key = keySelector(entry);
      const value = result[key];
      if (value) {
        value.push(entry);
      } else {
        result[key] = [entry];
      }
    }
    return result;
  };
}

export const groupAsync = groupByRecordAsync;
