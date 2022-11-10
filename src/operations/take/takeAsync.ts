import {AsyncOperationFunction} from '../../types';
import {asyncOperationFunctionFactory} from '../../utils';

export class TakeAsyncIterator<T> implements AsyncIterator<T> {
  private index = 0;

  constructor(private iterator: AsyncIterator<T>, private count: number) {}

  async next(): Promise<IteratorResult<T>> {
    const item = await this.iterator.next();
    return {done: item.done || this.index++ >= this.count, value: item.value};
  }
}

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function takeAsync<T>(count: number): AsyncOperationFunction<T, T> {
  return asyncOperationFunctionFactory(
    iterator => new TakeAsyncIterator(iterator, count)
  );
}
