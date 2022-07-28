import {OperationFunction} from '../../types';

export class SkipWhileIterator<T> implements IterableIterator<T> {
  private skip = true;

  constructor(
    private iterator: Iterator<T>,
    private predicate: (entry: T) => boolean
  ) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
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
  return entries =>
    new SkipWhileIterator(entries[Symbol.iterator](), predicate);
}
