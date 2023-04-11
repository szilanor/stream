import {AsyncOperationFunction} from '../../types';
import {doneResult, fromAsyncIteratorMapper, valueResult} from '../../utils';

class DistinctAsyncIterator<T> implements AsyncIterator<T> {
  private items: Set<T> = new Set<T>();

  constructor(private iterator: AsyncIterator<T>) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let {value, done} = await this.iterator.next();
      !done;
      {value, done} = await this.iterator.next()
    ) {
      if (!this.items.has(value)) {
        this.items.add(value);
        return valueResult(value);
      }
    }

    this.items.clear();
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctAsync<T>(): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    iterator => new DistinctAsyncIterator(iterator)
  );
}
