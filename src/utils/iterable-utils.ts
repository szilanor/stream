/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyOperationFunction,
  AsyncOperationFunction,
  OperationFunction,
} from '../types';
import {isAsyncIterable, isIterable} from './type-guards';

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
  return (iterable: Iterable<T>) => ({
    [Symbol.iterator](): Iterator<O> {
      return factory(iterable[Symbol.iterator]());
    },
  });
}

export function asyncOperationFunctionFactory<T, O = T>(
  factory: (iterable: AsyncIterator<T>) => AsyncIterator<O>
): AsyncOperationFunction<T, O> {
  return (iterable: AsyncIterable<T>) => ({
    [Symbol.asyncIterator](): AsyncIterator<O> {
      return factory(iterable[Symbol.asyncIterator]());
    },
  });
}

export function anyOperationFunctionFactory<T, O = T>(
  factory: (iterable: Iterator<T> | AsyncIterator<T>) => AsyncIterator<O>
): AnyOperationFunction<T, O> {
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
