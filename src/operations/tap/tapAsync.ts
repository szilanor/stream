import {AnyOperationFunction} from '../../types';
import {anyOperationFunctionFactory, isPromise} from '../../utils';

export class TapAsyncIterator<T> implements AsyncIterator<T> {
  constructor(
    private iterator: Iterator<T> | AsyncIterator<T>,
    private callback: (item: T) => void | PromiseLike<void>
  ) {}

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
): AnyOperationFunction<T, T> {
  return anyOperationFunctionFactory(
    iterator => new TapAsyncIterator(iterator, callback)
  );
}
