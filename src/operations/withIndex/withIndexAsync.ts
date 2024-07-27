import { doneResult, fromAsyncIteratorMapper, valueResult } from "../../utils";
import { AsyncOperationFunction } from "../../types";

export class IndexedAsyncIterator<T> implements AsyncIterator<[T, number]> {
  private index = 0;
  constructor(private iterator: AsyncIterator<T>) {}

  async next(): Promise<IteratorResult<[T, number]>> {
    const { value, done } = await this.iterator.next();
    return done ? doneResult() : valueResult([value, this.index++]);
  }
}

export function withIndexAsync<T>(): AsyncOperationFunction<T, [T, number]> {
  return fromAsyncIteratorMapper(
    (iterator) => new IndexedAsyncIterator(iterator),
  );
}
