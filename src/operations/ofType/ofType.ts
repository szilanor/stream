import {IterableIteratorBase, OperationFunction} from '../../types';

export class OfTypeIterator<T, TOfType extends T> extends IterableIteratorBase<
  T,
  TOfType
> {
  constructor(
    iterable: Iterable<T>,
    private predicate: (item: T) => item is TOfType
  ) {
    super(iterable);
  }

  next(): IteratorResult<TOfType> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.predicate(value)) {
        return this.valueResult(value);
      }
    }
    return this.doneResult();
  }
}

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofType<T, TOfType extends T>(
  predicate: (item: T) => item is TOfType
): OperationFunction<T, TOfType> {
  return iterable => new OfTypeIterator(iterable, predicate);
}
