import { AsyncOperationFunction, PredicateFunction } from "~/types";
import { fromAsyncIteratorMapper } from "~/utils";

class TakeWhileAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private predicate: PredicateFunction<T>,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    const { done, value } = await this.iterator.next();
    return { done: done || !this.predicate(value, this.index++), value };
  }
}

/**
 * Returns an AsyncOperationFunction that takes entries of the source Iterable while the parameter function returns true.
 * @param predicate The function to use to filter the entries.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that takes entries of the source Iterable while the parameter function returns true.
 *
 * @example
 * ```typescript
 * const result = takeWhileAsync<number>([1, 2, 3], (value) => value < 2);
 * console.log(result); // [1]
 * ```
 */
export function takeWhileAsync<T>(
  predicate: PredicateFunction<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new TakeWhileAsyncIterator(iterator, predicate),
  );
}
