import { AsyncOperationFunction } from "~/types";
import { concatAsync } from "~/creators/async/concatAsync";

/**
 * Returns an AsyncOperationFunction that yields the entries of the source Iterable then the parameter value.
 * @param values The values to append to the source Iterable.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields the entries of the source Iterable then the parameter value.
 *
 * @example
 * ```typescript
 * const result = endWithAsync<number>([1, 2, 3], 4, 5, 6);
 * console.log(result); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function endWithAsync<T>(...values: T[]): AsyncOperationFunction<T, T> {
  return (iterable) => concatAsync(iterable, values);
}
