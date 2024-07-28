import { CollectorFunction } from "../../types";
import { PredicateFunction } from "../../utils";

/**
 * Returns the index of the first element in the source that satisfies the predicate.
 * @param predicate Predicate function to determine if an element should be returned.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the index of the first element in the source that satisfies the predicate.
 * 
 * @example
 * ```typescript
 * const result = firstIndex<number>((x) => x > 1)([1, 2, 3]);
 * console.log(result); // 1
 * ```
 */
export function firstIndex<T>(
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, number> {
  return (source) => {
    let index = 0;
    for (const entry of source) {
      if (predicate(entry, index)) {
        return index;
      }
      index++;
    }
    return -1;
  };
}

export const findIndex = firstIndex;
