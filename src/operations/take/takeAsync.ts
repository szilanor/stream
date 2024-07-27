import { AsyncOperationFunction } from "../../types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "../../utils";

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

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function takeAsync<T>(count: number): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new TakeAsyncIterator(iterator, count),
  );
}
