import type { CollectorFunction } from "~/types";

/**
 * Returns a collector that returns the average of all entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = average([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function average(): CollectorFunction<number, number | undefined> {
  return (source) => {
    let counter = 0;
    let index = 0;
    for (const entry of source) {
      counter += entry;
      index++;
    }
    return index === 0 ? undefined : counter / index;
  };
}
