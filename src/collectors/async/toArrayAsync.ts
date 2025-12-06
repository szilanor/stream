import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/**
 * Returns a collector that returns an array of all entries in the Iterable.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns an array of all entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = toArrayAsync()([1, 2, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function toArrayAsync<T>(): AsyncCollectorFunction<T, T[]> {
  return reduceAsync(
    (result, entry) => {
      result.push(entry);
      return result;
    },
    () => [] as T[],
  );
}
