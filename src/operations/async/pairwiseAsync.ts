import { AsyncOperationFunction } from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";

class PairwiseAsyncIterator<T> implements AsyncIterator<[T, T]> {
  private prev: T | undefined;

  constructor(private iterator: AsyncIterator<T>) {}

  async next(): Promise<IteratorResult<[T, T]>> {
    for (
      let { done, value } = await this.iterator.next();
      !done;
      { done, value } = await this.iterator.next()
    ) {
      if (this.prev) {
        const result: IteratorResult<[T, T]> = valueResult([this.prev, value]);
        this.prev = value;
        return result;
      }
      this.prev = value;
    }
    return doneResult();
  }
}

/**
 * Returns an AsyncOperationFunction that yields the current and the previous entry of the source Iterable.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields the current and the previous entry of the source Iterable.
 *
 * @example
 * ```typescript
 * const result = pairwiseAsync<number>([1, 2, 3]);
 * console.log(result); // [[1, 2], [2, 3]]
 * ```
 */
export function pairwiseAsync<T>(): AsyncOperationFunction<T, [T, T]> {
  return fromAsyncIteratorMapper(
    (iterator) => new PairwiseAsyncIterator(iterator),
  );
}
