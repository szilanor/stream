import { CollectorFunction } from "../../types";
import { reduce } from "../reduce";

/**
 * Groups the source by a key selector.
 * @param keySelector Key selector function.
 * @typeParam T Type of items in the source.
 * @typeParam TKey Type of the key.
 * @returns Collector that groups the source by a key selector.
 * 
 * @example
 * ```typescript
 * const result = groupByRecord<number, string>((x) => x % 2 === 0 ? "even" : "odd")([1, 2, 3, 4]);
 * console.log(result);
 * // {
 * //   'odd': [1, 3],
 * //   'even': [2, 4],
 * // }
 * ```
 */
export function groupByRecord<T, TKey extends string | number | symbol>(
  keySelector: (entry: T) => TKey,
): CollectorFunction<T, Record<TKey, T[]>> {
  return reduce(
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

export const group = groupByRecord;
