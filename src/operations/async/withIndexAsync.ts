import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";
import { AsyncOperationFunction } from "~/types";

export class IndexedAsyncIterator<T> implements AsyncIterator<[T, number]> {
  private index = 0;
  constructor(private iterator: AsyncIterator<T>) {}

  async next(): Promise<IteratorResult<[T, number]>> {
    const { value, done } = await this.iterator.next();
    return done ? doneResult() : valueResult([value, this.index++]);
  }
}

/**
 * Returns an AsyncOperationFunction that yields the current and the index of the entry of the source Iterable.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields the current and the index of the entry of the source Iterable.
 *
 * @example
 * ```typescript
 * const result = withIndexAsync<number>([1, 2, 3]);
 * console.log(result); // [[1, 0], [2, 1], [3, 2]]
 * ```
 */
export function withIndexAsync<T>(): AsyncOperationFunction<T, [T, number]> {
  return fromAsyncIteratorMapper(
    (iterator) => new IndexedAsyncIterator(iterator),
  );
}
