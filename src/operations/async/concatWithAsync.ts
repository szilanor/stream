import { AsyncOperationFunction } from "~/types";
import { concatAsync } from "~/creators/async/concatAsync";

/**
 * Concatenates the Iterable with other Iterables in order.
 * @param iterables The iterables to concatenate.
 * @typeParam T The type of the elements in the iterables.
 * @returns An AsyncOperationFunction that concatenates the specified iterables to the source iterable.
 *
 * @example
 * ```typescript
 * const result = concatWithAsync<number>([1, 2, 3], [4, 5, 6]);
 * console.log(result); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function concatWithAsync<T>(
  ...iterables: Array<AsyncIterable<T> | Iterable<T>>
): AsyncOperationFunction<T, T> {
  return (iterable) => concatAsync(iterable, ...iterables);
}
