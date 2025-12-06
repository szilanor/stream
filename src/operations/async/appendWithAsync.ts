import { AsyncOperationFunction } from "~/types";
import { concatAsync } from "~/creators/async/concatAsync";

/**
 * Appends the specified iterables to the source iterable.
 * @param iterables The iterables to append.
 * @typeParam T The type of the elements in the iterables.
 * @returns An AsyncOperationFunction that appends the specified iterables to the source iterable.
 *
 * @example
 * ```typescript
 * const result = appendWithAsync<number>([1, 2, 3], [4, 5, 6]);
 * console.log(result); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function appendWithAsync<T>(
  ...iterables: Iterable<T>[]
): AsyncOperationFunction<T, T> {
  return (iterable) => concatAsync(...iterables, iterable);
}
