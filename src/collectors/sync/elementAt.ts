import type { CollectorFunction } from "~/types";

/**
 * Returns a collector that returns the element at the specified index.
 * @param index Index of the element to get.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the element at the specified index.
 *
 * @example
 * ```typescript
 * const result = elementAt<number>(1)([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function elementAt<T>(
  index: number,
): CollectorFunction<T, T | undefined> {
  return (source) => {
    let i = 0;
    for (const entry of source) {
      if (i === index) {
        return entry;
      }
      i++;
    }
    return undefined;
  };
}

export const at = elementAt;
