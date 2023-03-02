import {AsyncOperationFunction} from '../../types';
import {doneResult, EqualsFunction, valueResult, wrapAsync} from '../../utils';

class DistinctByAsyncIterator<T> implements AsyncIterator<T> {
  private items: Array<T> = new Array<T>();

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
      let found = false;

      for (const cached of this.items) {
        found = this.equalsFunction(cached, value);
      }

      if (!found) {
        this.items.push(value);
        return valueResult(value);
      }
    }

    this.items = [];
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctByAsync<T>(
  equalsFunction: EqualsFunction<T> = (a, b) => a === b
): AsyncOperationFunction<T, T> {
  return wrapAsync(
    iterator => new DistinctByAsyncIterator(iterator, equalsFunction)
  );
}
