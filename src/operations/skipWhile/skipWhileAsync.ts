import {doneResult, valueResult, wrapAsync} from '../../utils';
import {PredicateFunction} from '../../utils/util-types';
import {AsyncOperationFunction} from '../../types';

export class SkipWhileAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;
  private skip = true;

  constructor(
    private iterator: AsyncIterator<T>,
    private predicate: PredicateFunction<T>
  ) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let {done, value} = await this.iterator.next();
      !done;
      {done, value} = await this.iterator.next()
    ) {
      if (this.skip && (this.skip = this.predicate(value, this.index++)))
        continue;
      return valueResult(value);
    }
    return doneResult();
  }
}

/** Returns an Iterable skipping entries of the source Iterable while the parameter function returns true. */
export function skipWhileAsync<T>(
  predicate: PredicateFunction<T>
): AsyncOperationFunction<T, T> {
  return wrapAsync(iterator => new SkipWhileAsyncIterator(iterator, predicate));
}
