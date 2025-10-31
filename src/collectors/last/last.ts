import { CollectorFunction } from "../../types";
import { PredicateFunction } from "../../utils";

/**
 * Returns the last element in the source that satisfies the predicate.
 * @param predicate Predicate function to determine if an element should be returned.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the last element in the source that satisfies the predicate.
 *
 * @example
 * ```typescript
 * const result = last<number>((x) => x > 1)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function last<T>(
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, T | undefined> {
  return (source) => {
    let last = undefined;
    let index = 0;
    for (const entry of source) {
      if (predicate(entry, index++)) {
        last = entry;
      }
    }
    return last;
  };
}

export const findLast = last;
