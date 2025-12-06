import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/**
 * Returns a collector that returns a Record from an Iterable.
 * @param keySelector A function that defines the key for each entry.
 * @param valueSelector A function that defines the value for each entry.
 * @typeParam T Type of items in the source.
 * @typeParam TKey Type of the key.
 * @typeParam TValue Type of the value.
 * @returns Collector that returns a Record from an Iterable.
 *
 * @example
 * ```typescript
 * const result = toRecordAsync((x) => x, (x) => x)([1, 2, 3]);
 * console.log(result); // {1 => 1, 2 => 2, 3 => 3}
 * ```
 */
export function toRecordAsync<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue,
): AsyncCollectorFunction<T, Record<TKey, TValue>> {
  return reduceAsync(
    (result, entry) => {
      result[keySelector(entry)] = valueSelector(entry);
      return result;
    },
    () => ({}) as Record<TKey, TValue>,
  );
}

export const toObjectAsync = toRecordAsync;
