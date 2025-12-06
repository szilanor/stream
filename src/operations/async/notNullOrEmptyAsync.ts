import { AsyncOperationFunction } from "~/types";
import { fromAsyncIteratorMapper, isNotNullOrEmpty } from "~/utils";
import { FilterAsyncIterator } from "./filterAsync";

/**
 * Returns an AsyncOperationFunction that yields only the non-null / non-undefined / non-empty entries of the source Iterable.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields only the non-null / non-undefined / non-empty entries of the source Iterable.
 *
 * @example
 * ```typescript
 * const result = notNullOrEmptyAsync<number>([1, 2, null, undefined, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function notNullOrEmptyAsync<
  T extends { length: number },
>(): AsyncOperationFunction<T | undefined | null, NonNullable<T>> {
  return fromAsyncIteratorMapper(
    (iterator) =>
      new FilterAsyncIterator<T | null | undefined, NonNullable<T>>(
        iterator,
        isNotNullOrEmpty,
      ),
  );
}
