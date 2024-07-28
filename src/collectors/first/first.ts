import { CollectorFunction } from "../../types";
import { PredicateFunction } from "../../utils";

/**
 * Returns the first element in the source that satisfies the predicate.
 * @param predicate Predicate function to determine if an element should be returned.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the first element in the source that satisfies the predicate.
 * 
 * @example
 * ```typescript
 * const result = first<number>((x) => x > 1)([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function first<T>(
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, T | undefined> {
  return (source) => {
    let index = 0;
    for (const entry of source) {
      if (predicate(entry, index++)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const find = first;
