import { isFunction, isIterable } from "./type-guards";
import { ValueOrFactory } from "./util-types";

export function fromIteratorFactory<T>(
  factory: () => Iterator<T>,
): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      return factory();
    },
  };
}

export function fromAsyncIteratorFactory<T>(
  factory: () => AsyncIterator<T>,
): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      return factory();
    },
  };
}

export function getIterator<T>(iterable: Iterable<T>): Iterator<T>;
export function getIterator<T>(iterable: AsyncIterable<T>): AsyncIterator<T>;
export function getIterator<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Iterator<T> | AsyncIterator<T>;
export function getIterator<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Iterator<T> | AsyncIterator<T> {
  return isIterable(iterable)
    ? iterable[Symbol.iterator]()
    : iterable[Symbol.asyncIterator]();
}

export function doneResult<T>(): IteratorResult<T> {
  return { done: true, value: undefined as unknown };
}

export function valueResult<T>(value: T): IteratorResult<T> {
  return { done: false, value };
}

export function callValueOrFactory<T>(valueOrFactory: ValueOrFactory<T>) {
  return isFunction(valueOrFactory) ? valueOrFactory() : valueOrFactory;
}
