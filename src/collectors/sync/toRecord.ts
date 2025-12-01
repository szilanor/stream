import type { CollectorFunction } from "~/types";
import { reduce } from "./reduce";

/**
 * Converts the source to a record.
 * @param keySelector Key selector function.
 * @param valueSelector Value selector function.
 * @typeParam T Type of items in the source.
 * @typeParam TKey Type of the key.
 * @typeParam TValue Type of the value.
 * @returns Collector that converts the source to a record.
 *
 * @example
 * ```typescript
 * const result = toRecord<number, string, number>((x) => x.toString(), (x) => x * 2)([1, 2, 3]);
 * console.log(result);
 * // {
 * //   '1': 2,
 * //   '2': 4,
 * //   '3': 6,
 * // }
 * ```
 */
export function toRecord<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue,
): CollectorFunction<T, Record<TKey, TValue>> {
  return reduce(
    (result, entry) => {
      result[keySelector(entry)] = valueSelector(entry);
      return result;
    },
    () => ({}) as Record<TKey, TValue>,
  );
}

export const toObject = toRecord;
