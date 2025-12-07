import type { CollectorFunction, MapperFunction } from "~/types";

/**
 * Returns a collector that returns the average of all entries in the Iterable based on the selector function.
 *
 * @example
 * ```typescript
 * const result = averageBy([1, 2, 3], (x) => x);
 * console.log(result); // 2
 * ```
 */
export function averageBy<T>(
  selector: MapperFunction<T, number>,
): CollectorFunction<T, number | undefined> {
  return (source) => {
    let counter = 0;
    let index = 0;
    for (const entry of source) {
      counter += selector(entry, index++);
    }
    return index === 0 ? undefined : counter / index;
  };
}
