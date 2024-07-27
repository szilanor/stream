import { AsyncOperationFunction } from "../../types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "../../utils";

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

/** Returns an Iterable that yields the current and the previous entry of the source Iterable. */
export function pairwiseAsync<T>(): AsyncOperationFunction<T, [T, T]> {
  return fromAsyncIteratorMapper(
    (iterator) => new PairwiseAsyncIterator(iterator),
  );
}
