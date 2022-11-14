export abstract class IterableIteratorBase<T, O = T>
  implements IterableIterator<O>
{
  protected iterator: Iterator<T>;
  protected constructor(protected iterable: Iterable<T>) {
    this.iterator = this.iterable[Symbol.iterator]();
  }

  [Symbol.iterator](): IterableIterator<O> {
    return this;
  }

  abstract next(): IteratorResult<O>;
}

export abstract class IndexedIterableIteratorBase<
  T,
  O = T
> extends IterableIteratorBase<T, O> {
  protected index = 0;
}
