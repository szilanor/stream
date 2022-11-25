/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AsyncIterableWrapper,
  AsyncOperationFunction,
  IterableWrapper,
  OperationFunction,
} from '../types';
import {isAsyncIterable, isIterable} from './type-guards';

export function mapIterator<T, O = T>(
  mapper: (iterator: Iterator<T>) => Iterator<O>
): OperationFunction<T, O> {
  return iterable => new IterableWrapper(iterable, mapper);
}

export function mapAsyncIterator<T, O = T>(
  mapper: (iterator: AsyncIterator<T>) => AsyncIterator<O>
): AsyncOperationFunction<T, O> {
  return iterable => new AsyncIterableWrapper(iterable, mapper);
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
    : {
        [Symbol.asyncIterator](): AsyncIterator<T> {
          const iterator = iterable[Symbol.iterator]();
          return {
            async next(): Promise<IteratorResult<T>> {
              return iterator.next();
            },
          };
        },
      };
}

export class EmptyIterable<T> implements IterableIterator<T> {
  next(): IteratorResult<T> {
    return {done: true, value: undefined as unknown};
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

export function createEmptyIterable<T>(): Iterable<T> {
  return new EmptyIterable();
}

export class EmptyAsyncIterator<T> implements AsyncIterableIterator<T> {
  async next(): Promise<IteratorResult<T>> {
    return {done: true, value: undefined as unknown};
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
}

export function createEmptyAsyncIterable<T>(): AsyncIterable<T> {
  return new EmptyAsyncIterator();
}
