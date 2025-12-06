import { AsyncOperationFunction } from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";

class SkipAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private count: number,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let { done, value } = await this.iterator.next();
      !done;
      { done, value } = await this.iterator.next()
    ) {
      if (this.index++ >= this.count) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/**
 * Returns an AsyncOperationFunction that skips the given amount of entries of the source Iterable.
 * @param count The amount of entries to skip.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that skips the given amount of entries of the source Iterable.
 *
 * @example
 * ```typescript
 * const result = skipAsync<number>([1, 2, 3], 2);
 * console.log(result); // [3]
 * ```
 */
export function skipAsync<T>(count: number): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new SkipAsyncIterator(iterator, count),
  );
}
