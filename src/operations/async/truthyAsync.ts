import { AsyncOperationFunction } from "~/types";
import { filterAsync } from "~/operations/async/filterAsync";

/**
 * Returns an AsyncOperationFunction that yields only entries of the source Iterable with truthy value.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields only entries of the source Iterable with truthy value.
 *
 * @example
 * ```typescript
 * const result = truthyAsync<number>([1, 2, null, undefined, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function truthyAsync<T>(): AsyncOperationFunction<T, T> {
  return filterAsync((value) => !!value);
}
