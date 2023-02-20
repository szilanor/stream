import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

export class DistinctByIterator<T> implements Iterator<T> {
  private items: Array<T> = new Array<T>();

  constructor(
    private iterator: Iterator<T>,
    private comparer: (a: T, b: T) => boolean = (a, b) => a === b
  ) {}

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
        return valueResult(value);
      }
    }

    this.items = [];
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctBy<T>(
  comparer: (a: T, b: T) => boolean = (a, b) => a === b
): OperationFunction<T, T> {
  return wrap(iterator => new DistinctByIterator(iterator, comparer));
}
