import type { CollectorFunction } from "~/types";
import { reduce } from "./reduce";

/**
 * Converts the source to a map.
 * @param keySelector Key selector function.
 * @param valueSelector Value selector function.
 * @typeParam T Type of items in the source.
 * @typeParam TKey Type of the key.
 * @typeParam TValue Type of the value.
 * @returns Collector that converts the source to a map.
 *
 * @example
 * ```typescript
 * const result = toMap<number, string, number>((x) => x.toString(), (x) => x * 2)([1, 2, 3]);
 * console.log(result);
 * // Map {
 * //   '1' => 2,
 * //   '2' => 4,
 * //   '3' => 6,
 * // }
 * ```
 */
export function toMap<T, TKey, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue,
): CollectorFunction<T, Map<TKey, TValue>> {
  return reduce<T, Map<TKey, TValue>>(
    (result, entry) => result.set(keySelector(entry), valueSelector(entry)),
    () => new Map<TKey, TValue>(),
  );
}
