import {AsyncOperationFunction} from '../../types';
import {doneResult, EqualsFunction, valueResult, wrapAsync} from '../../utils';

class DistinctUntilChangedAsyncIterator<T> implements AsyncIterator<T> {
  private previous?: T;

  constructor(
    private iterator: AsyncIterator<T>,
    private equalsFunction: EqualsFunction<T> = (a, b) => a === b
  ) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let {value, done} = await this.iterator.next();
      !done;
      {value, done} = await this.iterator.next()
    ) {
      if (!this.previous || !this.equalsFunction(value, this.previous)) {
        this.previous = value;
        return valueResult(value);
      }
    }
    this.previous = undefined;
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctUntilChangedAsync<T>(
  equalsFunction?: EqualsFunction<T>
): AsyncOperationFunction<T, T> {
  return wrapAsync(
    iterator => new DistinctUntilChangedAsyncIterator(iterator, equalsFunction)
  );
}
