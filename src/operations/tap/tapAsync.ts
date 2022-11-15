import {
  AnyToAsyncIterableIteratorBase,
  AnyToAsyncOperationFunction,
} from '../../types';
import {isPromise} from '../../utils';

export class TapAsyncIterator<T> extends AnyToAsyncIterableIteratorBase<T> {
  constructor(
    iterable: Iterable<T> | AsyncIterable<T>,
    private callback: (item: T) => void | PromiseLike<void>
  ) {
    super(iterable);
  }

  async next(): Promise<IteratorResult<T>> {
    const item = this.iterator.next();
    const {value, done} = isPromise(item) ? await item : item;
    if (!done) {
      const result = this.callback(value);
      if (isPromise(result)) {
        await result;
      }
    }
    return item;
  }
}

/** Calls a callback function on each entry */
export function tapAsync<T>(
  callback: (item: T) => void | PromiseLike<void>
): AnyToAsyncOperationFunction<T, T> {
  return iterable => new TapAsyncIterator(iterable, callback);
}
