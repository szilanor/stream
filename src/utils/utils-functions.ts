import { AsyncOperationFunction, OperationFunction } from "../types";
import { doneResult } from "./iterable-utils";

class IteratorMapper<T, O = T> implements Iterable<O> {
  constructor(
    protected iterable: Iterable<T>,
    protected iteratorMapper: (iterator: Iterator<T>) => Iterator<O>,
  ) {}

  [Symbol.iterator](): Iterator<O> {
    return this.iteratorMapper(this.iterable[Symbol.iterator]());
  }
}

class AsyncIteratorMapper<T, O = T> implements AsyncIterable<O> {
  constructor(
    protected iterable: AsyncIterable<T>,
    protected iteratorMapper: (iterator: AsyncIterator<T>) => AsyncIterator<O>,
  ) {}

  [Symbol.asyncIterator](): AsyncIterator<O> {
    return this.iteratorMapper(this.iterable[Symbol.asyncIterator]());
  }
}

export function fromIteratorMapper<T, O = T>(
  mapper: (iterator: Iterator<T>) => Iterator<O>,
): OperationFunction<T, O> {
  return (iterable) => new IteratorMapper(iterable, mapper);
}

export function fromAsyncIteratorMapper<T, O = T>(
  mapper: (asyncIterator: AsyncIterator<T>) => AsyncIterator<O>,
): AsyncOperationFunction<T, O> {
  return (asyncIterator) => new AsyncIteratorMapper(asyncIterator, mapper);
}

export class EmptyIterator implements Iterator<never> {
  next(): IteratorResult<never> {
    return doneResult();
  }
}

export class EmptyAsyncIterator implements AsyncIterator<never> {
  async next(): Promise<IteratorResult<never>> {
    return doneResult();
  }
}

export class SyncToAsyncIterator<T> implements AsyncIterator<T> {
  constructor(private iterator: Iterator<T>) {}

  async next(): Promise<IteratorResult<T>> {
    return this.iterator.next();
  }
}
