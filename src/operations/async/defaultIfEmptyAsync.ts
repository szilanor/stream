import { AsyncOperationFunction, ValueOrFactory } from "~/types";
import {
  callValueOrFactory,
  fromAsyncIteratorMapper,
  valueResult,
} from "~/utils";

class DefaultIfEmptyAsyncIterator<T> implements AsyncIterator<T> {
  returnedValue = false;

  constructor(
    private iterator: AsyncIterator<T>,
    private defaultValue: ValueOrFactory<T>,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    const result = await this.iterator.next();
    if (!this.returnedValue) {
      this.returnedValue = true;
      if (result.done) {
        return valueResult(callValueOrFactory(this.defaultValue));
      }
    }
    return result;
  }
}

/**
 * Returns an AsyncOperationFunction that yields the defaultValue parameter if the source Iterable is empty.
 * @param defaultValue The value or factory to use when the source Iterable is empty.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields the defaultValue parameter if the source Iterable is empty.
 *
 * @example
 * ```typescript
 * const result = defaultIfEmptyAsync<number>([], 0);
 * console.log(result); // [0]
 * ```
 */
export function defaultIfEmptyAsync<T>(
  defaultValue: ValueOrFactory<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new DefaultIfEmptyAsyncIterator(iterator, defaultValue),
  );
}
