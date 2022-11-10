import {AsyncOperationFunction, OperationFunction} from '../types';

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
