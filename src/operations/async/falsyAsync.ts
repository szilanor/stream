import { AsyncOperationFunction } from "~/types";
import { FilterAsyncIterator } from "~/operations/async/filterAsync";
import { fromAsyncIteratorMapper } from "~/utils";

/**
 * Returns an AsyncOperationFunction that yields only entries of the source Iterable with falsy value.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields only entries of the source Iterable with falsy value.
 *
 * @example
 * ```typescript
 * const result = falsyAsync<number>([1, 2, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function falsyAsync<T>(): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new FilterAsyncIterator(iterator, (value) => !value),
  );
}
