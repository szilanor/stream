import { OperationFunction } from "~/types";
import { concat } from "~/creators/sync/concat";

/**
 * Appends the given Iterables to the end of the source Iterable.
 * @param iterables Iterables to append.
 * @typeParam T Type of items in the Iterables.
 * @returns Returns a new Iterable that yields the elements of the source Iterable followed by the elements of the given Iterables.
 *
 * @example
 * ```typescript
 * const result = appendWith([4, 5, 6], [7, 8, 9])([1, 2, 3]);
 * console.log([...result]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 */
export function appendWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return (iterable) => concat(...iterables, iterable);
}
