import { AsyncOperationFunction, CallbackFunction } from "~/types";
import { fromAsyncIteratorMapper } from "~/utils";

class TapAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private callback: CallbackFunction<T>,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    const result = await this.iterator.next();
    if (!result.done) {
      this.callback(result.value, this.index++);
    }
    return result;
  }
}

/**
 * Returns an AsyncOperationFunction that calls a callback function on each entry.
 * @param callback The callback function to call on each entry.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that calls a callback function on each entry.
 *
 * @example
 * ```typescript
 * const result = tapAsync<number>([1, 2, 3], (value) => console.log(value));
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function tapAsync<T>(
  callback: CallbackFunction<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new TapAsyncIterator(iterator, callback),
  );
}
