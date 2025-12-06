import { AsyncOperationFunction, EqualsFunction } from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";

class DistinctUntilChangedAsyncIterator<T> implements AsyncIterator<T> {
  private previous?: T;

  constructor(
    private iterator: AsyncIterator<T>,
    private equalsFunction: EqualsFunction<T> = (a, b) => a === b,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let { value, done } = await this.iterator.next();
      !done;
      { value, done } = await this.iterator.next()
    ) {
      if (!this.previous || !this.equalsFunction(value, this.previous)) {
        this.previous = value;
        return valueResult(value);
      }
    }
    this.previous = undefined;
    return doneResult();
  }
}

/**
 * Returns an AsyncOperationFunction that yields only entries of the source Iterable without duplicates.
 * @param equalsFunction The function to use to compare the elements.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields only entries of the source Iterable without duplicates.
 *
 * @example
 * ```typescript
 * const result = distinctUntilChangedAsync<number>([1, 2, 2, 3], (a, b) => a === b);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function distinctUntilChangedAsync<T>(
  equalsFunction?: EqualsFunction<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) =>
      new DistinctUntilChangedAsyncIterator(iterator, equalsFunction),
  );
}
