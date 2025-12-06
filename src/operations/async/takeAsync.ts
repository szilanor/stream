import { AsyncOperationFunction } from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";

class TakeAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private count: number,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    const { done, value } = await this.iterator.next();
    if (done || this.index++ >= this.count) {
      return doneResult();
    }
    return valueResult(value);
  }
}

/**
 * Returns an AsyncOperationFunction that takes the given amount of entries of the source Iterable.
 * @param count The amount of entries to take.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that takes the given amount of entries of the source Iterable.
 *
 * @example
 * ```typescript
 * const result = takeAsync<number>([1, 2, 3], 2);
 * console.log(result); // [1, 2]
 * ```
 */
export function takeAsync<T>(count: number): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new TakeAsyncIterator(iterator, count),
  );
}
