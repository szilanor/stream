import {IterableIteratorBase, OperationFunction} from '../../types';

export class SkipWhileIterator<T> extends IterableIteratorBase<T> {
  private skip = true;

  constructor(iterable: Iterable<T>, private predicate: (entry: T) => boolean) {
    super(iterable);
  }

  next(): IteratorResult<T> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (this.skip && (this.skip = this.predicate(item.value))) continue;
      return {done: false, value: item.value};
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable skipping entries of the source Iterable while the parameter function returns true. */
export function skipWhile<T>(
  predicate: (entry: T) => boolean
): OperationFunction<T, T> {
  return iterable => new SkipWhileIterator(iterable, predicate);
}
