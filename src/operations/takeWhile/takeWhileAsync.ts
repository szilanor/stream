import {AsyncOperationFunction} from '../../types';
import {PredicateFunction, wrapAsync} from '../../utils';

class TakeWhileAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private predicate: PredicateFunction<T>
  ) {}

  async next(): Promise<IteratorResult<T>> {
    const {done, value} = await this.iterator.next();
    return {done: done || !this.predicate(value, this.index++), value};
  }
}

/** Returns an Iterable taking entries of the source Iterable while the parameter function returns true. */
export function takeWhileAsync<T>(
  predicate: PredicateFunction<T>
): AsyncOperationFunction<T, T> {
  return wrapAsync(iterator => new TakeWhileAsyncIterator(iterator, predicate));
}
