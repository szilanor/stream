import type { CollectorFunction, MapperFunction } from "~/types";

/**
 * Returns a collector that returns the sum of all entries in the Iterable based on the selector function.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the sum of all entries in the Iterable based on the selector function.
 *
 * @example
 * ```typescript
 * const result = sumBy((x) => x)([1, 2, 3]);
 * console.log(result); // 6
 * ```
 */
export function sumBy<T>(
  selector: MapperFunction<T, number>,
): CollectorFunction<T, number | undefined> {
  return (source) => {
    let counter: number | undefined = undefined;
    let index = 0;
    for (const entry of source) {
      counter =
        counter === undefined
          ? selector(entry, index++)
          : counter + selector(entry, index++);
    }
    return counter;
  };
}
