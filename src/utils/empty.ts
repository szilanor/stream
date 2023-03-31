import {doneResult} from './iterable-utils';
import {toAsyncIterable} from './wrap';

class EmptyIterableIterator<T> implements IterableIterator<T> {
  next(): IteratorResult<T> {
    return doneResult();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

export const EMPTY: Iterable<never> = new EmptyIterableIterator();
export const EMPTY_ASYNC: AsyncIterable<never> = toAsyncIterable(EMPTY);
