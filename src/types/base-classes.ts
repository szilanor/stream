import {getIterator} from '../utils';

export class IterableWrapper<T, O = T> implements Iterable<O> {
  constructor(
    protected iterable: Iterable<T>,
    protected iteratorMapper: (iterator: Iterator<T>) => Iterator<O>
  ) {}

  [Symbol.iterator](): Iterator<O> {
    return this.iteratorMapper(this.iterable[Symbol.iterator]());
  }
}

export class AsyncIterableWrapper<T, O = T> implements AsyncIterable<O> {
  constructor(
    protected iterable: AsyncIterable<T>,
    protected iteratorMapper: (iterator: AsyncIterator<T>) => AsyncIterator<O>
  ) {}

  [Symbol.asyncIterator](): AsyncIterator<O> {
    return this.iteratorMapper(this.iterable[Symbol.asyncIterator]());
  }
}

export abstract class AsyncIterableIteratorBase<T, O = T>
  implements AsyncIterableIterator<O>
{
  protected iterator: AsyncIterator<T>;
  protected constructor(protected iterable: AsyncIterable<T>) {
    this.iterator = this.iterable[Symbol.asyncIterator]();
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<O> {
    return this;
  }

  abstract next(): Promise<IteratorResult<O>>;
}

export abstract class AsyncIndexedIterableIteratorBase<
  T,
  O = T
> extends AsyncIterableIteratorBase<T, O> {
  protected index = 0;
}

export abstract class AnyToAsyncIterableIteratorBase<T, O = T>
  implements AsyncIterableIterator<O>
{
  protected iterator: Iterator<T> | AsyncIterator<T>;
  protected constructor(protected iterable: Iterable<T> | AsyncIterable<T>) {
    this.iterator = getIterator(this.iterable);
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<O> {
    return this;
  }

  abstract next(): Promise<IteratorResult<O>>;
}

export abstract class AnyToAsyncIndexedIterableIteratorBase<
  T,
  O = T
> extends AnyToAsyncIterableIteratorBase<T, O> {
  protected index = 0;
}
