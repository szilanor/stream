import type { AsyncCollectorFunction, MapperFunction } from "~/types";

/**
 * Returns a collector that returns the average of all entries in the Iterable based on the selector function.
 *
 * @example
 * ```typescript
 * const result = await averageByAsync([1, 2, 3], (x) => x);
 * console.log(result); // 2
 * ```
 */
export function averageByAsync<T>(
  selector: MapperFunction<T, number>,
): AsyncCollectorFunction<T, number | undefined> {
  return async (source) => {
    let counter = 0;
    let index = 0;
    for await (const entry of source) {
      counter += selector(entry, index++);
    }
    return index === 0 ? undefined : counter / index;
  };
}
