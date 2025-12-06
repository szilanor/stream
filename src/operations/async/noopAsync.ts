import { AsyncOperationFunction } from "~/types";

/**
 * Simply returns every entry from the source Iterable.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that simply returns every entry from the source Iterable.
 *
 * @example
 * ```typescript
 * const result = noopAsync<number>([1, 2, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function noopAsync<T>(): AsyncOperationFunction<T, T> {
  return (source) => source;
}
