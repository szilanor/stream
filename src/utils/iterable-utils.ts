/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AsyncIterableWrapper,
  AsyncOperationFunction,
  IterableWrapper,
  OperationFunction,
} from '../types';
import {isAsyncIterable, isIterable} from './type-guards';

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

export function fromIterator<T>(factory: () => Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      return factory();
    },
  };
}

export function getIterator<T>(
  iterable: Iterable<T> | AsyncIterable<T>
): Iterator<T> | AsyncIterator<T>;
export function getIterator<T>(iterable: Iterable<T>): Iterator<T>;
export function getIterator<T>(iterable: AsyncIterable<T>): AsyncIterator<T>;
export function getIterator<T>(
  iterable: Iterable<T> | AsyncIterable<T>
): Iterator<T> | AsyncIterator<T> {
  return isIterable(iterable)
    ? iterable[Symbol.iterator]()
    : iterable[Symbol.asyncIterator]();
}

export function toAsyncIterable<T>(
  iterable: Iterable<T> | AsyncIterable<T>
): AsyncIterable<T> {
  return isAsyncIterable(iterable)
    ? iterable
    : new SyncToAsyncIterableWrapper(iterable);
}

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

class EmptyIterableIterator<T> implements IterableIterator<T> {
  next(): IteratorResult<T> {
    return doneResult();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

export function createEmptyIterable<T>(): Iterable<T> {
  return new EmptyIterableIterator();
}

class EmptyAsyncIterableIterator<T> implements AsyncIterableIterator<T> {
  async next(): Promise<IteratorResult<T>> {
    return doneResult();
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
}

export function createEmptyAsyncIterable<T>(): AsyncIterable<T> {
  return new EmptyAsyncIterableIterator();
}

export function doneResult<T>(): IteratorResult<T> {
  return {done: true, value: undefined as unknown};
}

export function valueResult<T>(value: T): IteratorResult<T> {
  return {done: false, value};
}
