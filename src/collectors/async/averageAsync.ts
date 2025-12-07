import type { AsyncCollectorFunction } from "~/types";

/**
 * Returns a collector that returns the average of all entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = await averageAsync([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function averageAsync(): AsyncCollectorFunction<
  number,
  number | undefined
> {
  return async (source) => {
    let counter = 0;
    let index = 0;
    for await (const entry of source) {
      counter += entry;
      index++;
    }
    return index === 0 ? undefined : counter / index;
  };
}
