import { AsyncOperationFunction } from "~/types";
import { concatAsync } from "~/creators/async/concatAsync";

/**
 * Returns an AsyncOperationFunction that yields the value parameter then the entries of the source Iterable.
 * @param values The values to yield before the entries of the source Iterable.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields the value parameter then the entries of the source Iterable.
 *
 * @example
 * ```typescript
 * const result = startWithAsync<number>([1, 2, 3], 2);
 * console.log(result); // [2, 1, 2, 3]
 * ```
 */
export function startWithAsync<T>(
  ...values: T[]
): AsyncOperationFunction<T, T> {
  return (iterable) => concatAsync(values, iterable);
}
