import {
  AsyncIterableWrapper,
  AsyncOperationFunction,
  IterableWrapper,
  OperationFunction,
} from '../types';

class SyncToAsyncIterableWrapper<T> implements AsyncIterable<T> {
  constructor(private iterable: Iterable<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return new SyncToAsyncIteratorWrapper(this.iterable[Symbol.iterator]());
  }
}

class SyncToAsyncIteratorWrapper<T> implements AsyncIterator<T> {
  constructor(private iterator: Iterator<T>) {}

  async next(): Promise<IteratorResult<T>> {
    return this.iterator.next();
  }
}

export function wrap<T, O = T>(
  mapper: (iterator: Iterator<T>) => Iterator<O>
): OperationFunction<T, O> {
  return iterable => new IterableWrapper(iterable, mapper);
}

export function wrapAsync<T, O = T>(
  mapper: (asyncIterator: AsyncIterator<T>) => AsyncIterator<O>
): AsyncOperationFunction<T, O> {
  return asyncIterator => new AsyncIterableWrapper(asyncIterator, mapper);
}

export function toAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T> {
  return new SyncToAsyncIterableWrapper(iterable);
}
