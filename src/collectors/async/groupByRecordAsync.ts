import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/**
 * Returns a collector that creates a group of entries where the group key is calculated by the selector function.
 * @param keySelector A function that returns the group key for each entry.
 * @typeParam T Type of items in the source.
 * @typeParam TKey Type of the group key.
 * @returns Collector that creates a group of entries where the group key is calculated by the selector function.
 *
 * @example
 * ```typescript
 * const result = groupByRecordAsync((x) => x % 2)([1, 2, 3]);
 * console.log(result); // { 1 => [1, 3], 0 => [2] }
 * ```
 */
export function groupByRecordAsync<T, TKey extends string | number | symbol>(
  keySelector: (entry: T) => TKey,
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
    () => ({}) as Record<TKey, T[]>,
  );
}

export const groupAsync = groupByRecordAsync;
