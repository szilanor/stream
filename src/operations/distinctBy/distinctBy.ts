import {IterableIteratorBase, OperationFunction} from '../../types';

export class DistinctByIterator<T> extends IterableIteratorBase<T> {
  private items: Array<T> = new Array<T>();

  constructor(
    iterable: Iterable<T>,
    private comparer: (a: T, b: T) => boolean = (a, b) => a === b
  ) {
    super(iterable);
  }

  next(): IteratorResult<T> {
    for (
      let {value, done} = this.iterator.next();
      !done;
      {value, done} = this.iterator.next()
    ) {
      let found = false;

      for (const cached of this.items) {
        found = this.comparer(cached, value);
      }

      if (!found) {
        this.items.push(value);
        return this.valueResult(value);
      }
    }

    this.items = [];
    return this.doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctBy<T>(
  comparer: (a: T, b: T) => boolean = (a, b) => a === b
): OperationFunction<T, T> {
  return iterable => new DistinctByIterator(iterable, comparer);
}
