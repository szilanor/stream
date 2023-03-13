import {AsyncCollectorFunction} from '../../types';
import {reduceAsync} from '../reduce';

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupByRecordAsync<T, TKey extends string | number | symbol>(
  keySelector: (entry: T) => TKey
): AsyncCollectorFunction<T, Record<TKey, T[]>> {
  return reduceAsync(
    (result, entry) => {
      const key = keySelector(entry);
      const value = result[key];
      if (value) {
        value.push(entry);
      } else {
        result[key] = [entry];
      }
      return result;
    },
    () => ({} as Record<TKey, T[]>)
  );
}

export const groupAsync = groupByRecordAsync;
