import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/**
 * Returns a collector that returns a Map from an Iterable.
 * @param keySelector A function that defines the key for each entry.
 * @param valueSelector A function that defines the value for each entry.
 * @typeParam T Type of items in the source.
 * @typeParam TKey Type of the key.
 * @typeParam TValue Type of the value.
 * @returns Collector that returns a Map from an Iterable.
 *
 * @example
 * ```typescript
 * const result = toMapAsync((x) => x, (x) => x)([1, 2, 3]);
 * console.log(result); // Map {1 => 1, 2 => 2, 3 => 3}
 * ```
 */
export function toMapAsync<T, TKey, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue,
): AsyncCollectorFunction<T, Map<TKey, TValue>> {
  return reduceAsync(
    (result, entry) => result.set(keySelector(entry), valueSelector(entry)),
    () => new Map<TKey, TValue>(),
  );
}
