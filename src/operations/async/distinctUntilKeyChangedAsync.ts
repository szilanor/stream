import { AsyncOperationFunction, EqualsFunction } from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";

class DistinctUntilKeyChangedAsyncIterator<T, K extends keyof T>
  implements AsyncIterator<T>
{
  private previous?: T[K];

  constructor(
    private iterator: AsyncIterator<T>,
    private key: K,
    private equalsFunction: EqualsFunction<T[K]> = (a, b) => a === b,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let { value, done } = await this.iterator.next();
      !done;
      { value, done } = await this.iterator.next()
    ) {
      const keyValue = value[this.key];
      if (!this.previous || !this.equalsFunction(keyValue, this.previous)) {
        this.previous = keyValue;
        return valueResult(value);
      }
    }
    this.previous = undefined;
    return doneResult();
  }
}

/**
 * Returns an AsyncOperationFunction that yields only entries of the source Iterable without duplicates.
 * @param key The key to use to compare the elements.
 * @param equalsFunction The function to use to compare the elements.
 * @typeParam T The type of the elements in the source Iterable.
 * @typeParam K The type of the key to use to compare the elements.
 * @returns An AsyncOperationFunction that yields only entries of the source Iterable without duplicates.
 *
 * @example
 * ```typescript
 * const result = distinctUntilKeyChangedAsync<number>([1, 2, 2, 3], (a, b) => a === b);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function distinctUntilKeyChangedAsync<T, K extends keyof T>(
  key: K,
  equalsFunction?: EqualsFunction<T[K]>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) =>
      new DistinctUntilKeyChangedAsyncIterator(iterator, key, equalsFunction),
  );
}
