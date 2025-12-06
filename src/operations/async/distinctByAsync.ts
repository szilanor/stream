import { AsyncOperationFunction, EqualsFunction } from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";

class DistinctByAsyncIterator<T> implements AsyncIterator<T> {
  private items: Array<T> = new Array<T>();

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
      if (
        this.items.findIndex((cached) => this.equalsFunction(cached, value)) ===
        -1
      ) {
        this.items.push(value);
        return valueResult(value);
      }
    }

    this.items = [];
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
 * const result = distinctByAsync<number>([1, 2, 2, 3], (a, b) => a === b);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function distinctByAsync<T>(
  equalsFunction: EqualsFunction<T> = (a, b) => a === b,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new DistinctByAsyncIterator(iterator, equalsFunction),
  );
}
