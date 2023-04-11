import {AsyncOperationFunction, OperationFunction} from '../types';

class IteratorMapper<T, O = T> implements Iterable<O> {
  constructor(
    protected iterable: Iterable<T>,
    protected iteratorMapper: (iterator: Iterator<T>) => Iterator<O>
  ) {}

  [Symbol.iterator](): Iterator<O> {
    return this.iteratorMapper(this.iterable[Symbol.iterator]());
  }
}

class AsyncIteratorMapper<T, O = T> implements AsyncIterable<O> {
  constructor(
    protected iterable: AsyncIterable<T>,
    protected iteratorMapper: (iterator: AsyncIterator<T>) => AsyncIterator<O>
  ) {}

  [Symbol.asyncIterator](): AsyncIterator<O> {
    return this.iteratorMapper(this.iterable[Symbol.asyncIterator]());
  }
}

interface SyncAndAsyncIterable<T> extends AsyncIterable<T>, Iterable<T> {}

class AsAsyncIterable<T> implements SyncAndAsyncIterable<T> {
  constructor(private iterable: Iterable<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return new AsAsyncIterator(this.iterable[Symbol.iterator]());
  }

  [Symbol.iterator](): Iterator<T> {
    return this.iterable[Symbol.iterator]();
  }
}

class AsAsyncIterator<T> implements AsyncIterator<T> {
  constructor(private iterator: Iterator<T>) {}

  async next(): Promise<IteratorResult<T>> {
    return this.iterator.next();
  }
}

export function fromIteratorMapper<T, O = T>(
  mapper: (iterator: Iterator<T>) => Iterator<O>
): OperationFunction<T, O> {
  return iterable => new IteratorMapper(iterable, mapper);
}

export function fromAsyncIteratorMapper<T, O = T>(
  mapper: (asyncIterator: AsyncIterator<T>) => AsyncIterator<O>
): AsyncOperationFunction<T, O> {
  return asyncIterator => new AsyncIteratorMapper(asyncIterator, mapper);
}

export const EMPTY: SyncAndAsyncIterable<never> = new AsAsyncIterable([]);

export function toAsyncIterable<T>(
  iterable: Iterable<T>
): SyncAndAsyncIterable<T> {
  return iterable === EMPTY ? EMPTY : new AsAsyncIterable(iterable);
}
