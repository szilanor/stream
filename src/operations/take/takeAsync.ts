import {
  AsyncIndexedIterableIteratorBase,
  AsyncOperationFunction,
} from '../../types';

export class TakeAsyncIterator<T> extends AsyncIndexedIterableIteratorBase<T> {
  constructor(iterable: AsyncIterable<T>, private count: number) {
    super(iterable);
  }

  async next(): Promise<IteratorResult<T>> {
    const item = await this.iterator.next();
    return {done: item.done || this.index++ >= this.count, value: item.value};
  }
}

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function takeAsync<T>(count: number): AsyncOperationFunction<T, T> {
  return iterable => new TakeAsyncIterator(iterable, count);
}
