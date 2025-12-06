import { OperationFunction } from "~/types";
import { concat } from "~/creators/sync/concat";

/**
 * Returns an OperationFunction that yields elements from the source followed by the provided values.
 * @typeParam T Type of items in the source.
 * @param values Values to yield after the source.
 * @returns An OperationFunction that yields elements from the source followed by the provided values.
 *
 * @example
 * ```typescript
 * const result = startWith(0, 1, 2)([3, 4, 5]);
 * console.log([...result]); // [0, 1, 2, 3, 4, 5]
 * ```
 */
export function startWith<T>(...values: T[]): OperationFunction<T, T> {
  return (iterable) => concat(values, iterable);
}
