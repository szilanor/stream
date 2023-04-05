import {AsyncOperationFunction} from '../../types';
import {doneResult, valueResult, wrapAsync} from '../../utils';

class SkipAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;

  constructor(private iterator: AsyncIterator<T>, private count: number) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let {done, value} = await this.iterator.next();
      !done;
      {done, value} = await this.iterator.next()
    ) {
      if (this.index++ >= this.count) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/** Returns an Iterable skipping the given amount of entries of the source Iterable. */
export function skipAsync<T>(count: number): AsyncOperationFunction<T, T> {
  return wrapAsync(iterator => new SkipAsyncIterator(iterator, count));
}
