import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "~/collectors/async/reduceAsync";

/**
 * Returns a collector that returns a Set from an Iterable.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns a Set from an Iterable.
 *
 * @example
 * ```typescript
 * const result = toSetAsync()([1, 2, 3]);
 * console.log(result); // Set {1, 2, 3}
 * ```
 */
export function toSetAsync<T>(): AsyncCollectorFunction<T, Set<T>> {
  return reduceAsync(
    (result, entry) => result.add(entry),
    () => new Set<T>(),
  );
}
