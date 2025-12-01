import { AsyncOperationFunction, TypeGuardFunction } from "~/types";
import { fromAsyncIteratorMapper } from "~/utils";
import { FilterAsyncIterator } from "./filterAsync";

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofTypeAsync<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>,
): AsyncOperationFunction<T, TOfType> {
  return fromAsyncIteratorMapper(
    (iterator) => new FilterAsyncIterator(iterator, predicate),
  );
}
