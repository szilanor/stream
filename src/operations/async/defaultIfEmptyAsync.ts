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

/** Returns an Iterable with the value parameter if the source Iterable is empty. */
export function defaultIfEmptyAsync<T>(
  defaultValue: ValueOrFactory<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new DefaultIfEmptyAsyncIterator(iterator, defaultValue),
  );
}
