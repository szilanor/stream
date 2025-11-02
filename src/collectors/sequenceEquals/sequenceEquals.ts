import { CollectorFunction } from "../../types";
import { EqualsFunction } from "../../utils";

/**
 * Determines whether two sequences are equal by comparing the elements pairwise.
 * @param other Iterable to compare to the source.
 * @param equalsFunction Function to determine if two elements are equal.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns true if the two sequences are equal, false otherwise.
 *
 * @example
 * ```typescript
 * const result = sequenceEquals([1, 2, 3])([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function sequenceEquals<T>(
  other: Iterable<T>,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b,
): CollectorFunction<T, boolean> {
  return (source) => {
    const sourceIterator = source[Symbol.iterator]();
    const otherIterator = other[Symbol.iterator]();

    while (true) {
      const sourceNext = sourceIterator.next();
      const otherNext = otherIterator.next();
      if (otherNext.done) {
        return true;
      }
      if (
        sourceNext.done ||
        !equalsFunction(sourceNext.value, otherNext.value)
      ) {
        return false;
      }
    }
  };
}
