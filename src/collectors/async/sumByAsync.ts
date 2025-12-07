import type { AsyncCollectorFunction, MapperFunction } from "~/types";

/**
 * Returns a collector that returns the sum of all entries in the Iterable.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the sum of all entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = sumByAsync((x) => x)([1, 2, 3]);
 * console.log(result); // 6
 * ```
 */
export function sumByAsync<T>(
  selector: MapperFunction<T, number>,
): AsyncCollectorFunction<T, number | undefined> {
  return async (source) => {
    let counter: number | undefined = undefined;
    let index = 0;
    for await (const entry of source) {
      counter =
        counter === undefined
          ? selector(entry, index++)
          : counter + selector(entry, index++);
    }
    return counter;
  };
}
