import { AsyncOperationFunction, TypeGuardFunction } from "~/types";
import { fromAsyncIteratorMapper } from "~/utils";
import { FilterAsyncIterator } from "./filterAsync";

/**
 * Returns an AsyncOperationFunction that yields and casts only entries of the source Iterable that satisfy the given type-guard function.
 * @param predicate The type-guard function to use to filter the entries.
 * @typeParam T The type of the elements in the source Iterable.
 * @typeParam TOfType The type of the elements in the result Iterable.
 * @returns An AsyncOperationFunction that yields and casts only entries of the source Iterable that satisfy the given type-guard function.
 *
 * @example
 * ```typescript
 * const result = ofTypeAsync<number, number>([1, 2, null, undefined, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function ofTypeAsync<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>,
): AsyncOperationFunction<T, TOfType> {
  return fromAsyncIteratorMapper(
    (iterator) => new FilterAsyncIterator(iterator, predicate),
  );
}
