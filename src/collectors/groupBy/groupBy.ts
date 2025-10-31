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
 * const result = groupBy<number, string>((x) => x % 2 === 0 ? "even" : "odd")([1, 2, 3, 4]);
 * console.log(result);
 * // Map {
 * //   'odd' => [1, 3],
 * //   'even' => [2, 4],
 * // }
 * ```
 */
export function groupBy<T, TKey>(
  keySelector: (entry: T) => TKey,
): CollectorFunction<T, Map<TKey, T[]>> {
  return reduce(
    (result, entry) => {
      const key = keySelector(entry);
      const value = result.get(key);
      if (value) {
        value.push(entry);
      } else {
        return result.set(key, [entry]);
      }
      return result;
    },
    () => new Map<TKey, T[]>(),
  );
}
