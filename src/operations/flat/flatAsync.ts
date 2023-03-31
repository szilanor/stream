import {AsyncOperationFunction} from '../../types';
import {doneResult, valueResult, wrapAsync} from '../../utils';

class FlatAsyncIterator<T> implements AsyncIterator<T> {
  private current: AsyncIterator<T> | null = null;

  constructor(private readonly iterator: AsyncIterator<Iterable<T>>) {}

  async next(): Promise<IteratorResult<T>> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.current) {
        const {value, done} = await this.current.next();
        if (!done) {
          return valueResult(value);
        }
        this.current = null;
      }

      const {value, done} = await this.iterator.next();
      if (done) {
        return doneResult();
      }

      this.current = value[Symbol.iterator]();
    }
  }
}

/** Returns an Iterable that yields the inner entries of array entries of the source Iterable. */
export function flatAsync<T>(): AsyncOperationFunction<Iterable<T>, T> {
  return wrapAsync(iterator => new FlatAsyncIterator(iterator));
}

export const flattenAsync = flatAsync;
