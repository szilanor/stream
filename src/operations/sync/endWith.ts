import { OperationFunction } from "~/types";
import { concat } from "~/creators/sync/concat";

/**
 * Concatenates the given values to the end of the source Iterable.
 * @param values Values to concatenate.
 * @typeParam T Type of items in the Iterables.
 * @returns Returns a new Iterable that yields the elements of the source Iterable followed by the given values.
 *
 * @example
 * ```typescript
 * const result = endWith(4, 5, 6)([1, 2, 3]);
 * console.log([...result]); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function endWith<T>(...values: T[]): OperationFunction<T, T> {
  return (iterable) => concat(iterable, values);
}
