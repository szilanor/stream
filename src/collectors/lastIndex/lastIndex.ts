import { CollectorFunction } from "../../types";
import { PredicateFunction } from "../../utils";

/**
 * Returns the index of the last element in the source that satisfies the predicate.
 * @param predicate Predicate function to determine if an element should be returned.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the index of the last element in the source that satisfies the predicate.
 *
 * @example
 * ```typescript
 * const result = lastIndex<number>((x) => x > 1)([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function lastIndex<T>(
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, number> {
  return (source) => {
    let index = -1;
    let lastIndex = index;
    for (const entry of source) {
      index++;
      if (predicate(entry, index)) {
        lastIndex = index;
      }
    }
    return lastIndex;
  };
}

export const findLastIndex = lastIndex;
