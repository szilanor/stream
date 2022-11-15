/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyToAsyncOperationFunction,
  AsyncOperationFunction,
  OperationFunction,
} from '../types';
import {isAsyncIterable, isIterable} from './type-guards';

export function fromIterator<T>(
  iteratorFactory: () => Iterator<T>
): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      return iteratorFactory();
    },
  };
}

export function fromAsyncIterator<T>(
  iteratorFactory: () => AsyncIterator<T>
): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      return iteratorFactory();
    },
  };
}

export function getIterator<T>(
  iterable: Iterable<T> | AsyncIterable<T>
): Iterator<T> | AsyncIterator<T> {
  return isIterable(iterable)
    ? iterable[Symbol.iterator]()
    : iterable[Symbol.asyncIterator]();
}

export function operationFunctionFactory<T, O = T>(
  factory: (iterable: Iterator<T>) => Iterator<O>
): OperationFunction<T, O> {
  return (iterable: Iterable<T>) =>
    fromIterator(() => factory(iterable[Symbol.iterator]()));
}

export function asyncOperationFunctionFactory<T, O = T>(
  factory: (iterable: AsyncIterator<T>) => AsyncIterator<O>
): AsyncOperationFunction<T, O> {
  return (iterable: AsyncIterable<T>) =>
    fromAsyncIterator(() => factory(iterable[Symbol.asyncIterator]()));
}

export function anyOperationFunctionFactory<T, O = T>(
  factory: (iterable: Iterator<T> | AsyncIterator<T>) => AsyncIterator<O>
): AnyToAsyncOperationFunction<T, O> {
  return (iterable: Iterable<T> | AsyncIterable<T>) => ({
    [Symbol.asyncIterator](): AsyncIterator<O> {
      const iterator = isIterable(iterable)
        ? iterable[Symbol.iterator]()
        : iterable[Symbol.asyncIterator]();
      return factory(iterator);
    },
  });
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
              const {value, done} = iterator.next();
              return done
                ? {done, value: undefined as unknown}
                : {done, value: value};
            },
          };
        },
      };
}

export class EmptyIterator<T> implements IterableIterator<T> {
  next(): IteratorResult<T> {
    return {done: true, value: undefined as unknown};
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

export function createEmptyIterable<T>(): Iterable<T> {
  return fromIterator<T>(() => new EmptyIterator());
}

export class EmptyAsyncIterator<T> implements AsyncIterator<T> {
  async next(): Promise<IteratorResult<T>> {
    return {done: true, value: undefined as unknown};
  }
}

export function createEmptyAsyncIterable<T>(): AsyncIterable<T> {
  return fromAsyncIterator<T>(() => new EmptyAsyncIterator());
}
