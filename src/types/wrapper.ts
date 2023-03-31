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
