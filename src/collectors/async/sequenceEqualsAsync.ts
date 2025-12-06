import type { AsyncCollectorFunction, EqualsFunction } from "~/types";

/**
 * Returns a collector that returns true if the Iterable is equal to the other Iterable based on the equals function.
 * @param other The other Iterable to compare to.
 * @param equalsFunction A function that defines the sort order of the elements.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns true if the Iterable is equal to the other Iterable based on the equals function.
 *
 * @example
 * ```typescript
 * const result = sequenceEqualsAsync([1, 2, 3])([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function sequenceEqualsAsync<T>(
  other: Iterable<T>,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b,
): AsyncCollectorFunction<T, boolean> {
  return async (source) => {
    const sourceIterator = source[Symbol.asyncIterator]();
    const otherIterator = other[Symbol.iterator]();

    while (true) {
      const sourceNext = await sourceIterator.next();
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
