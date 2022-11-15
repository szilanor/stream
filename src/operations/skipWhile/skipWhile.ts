import {IterableIteratorBase, OperationFunction} from '../../types';

export class SkipWhileIterator<T> extends IterableIteratorBase<T> {
  private skip = true;

  constructor(iterable: Iterable<T>, private predicate: (entry: T) => boolean) {
    super(iterable);
  }

  next(): IteratorResult<T> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.skip && (this.skip = this.predicate(value))) continue;
      return this.valueResult(value);
    }
    return this.doneResult();
  }
}

/** Returns an Iterable skipping entries of the source Iterable while the parameter function returns true. */
export function skipWhile<T>(
  predicate: (entry: T) => boolean
): OperationFunction<T, T> {
  return iterable => new SkipWhileIterator(iterable, predicate);
}
