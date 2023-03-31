import {OperationFunction} from '../../types';
import {doneResult, EqualsFunction, valueResult, wrap} from '../../utils';

class DistinctByIterator<T> implements Iterator<T> {
  private items: Array<T> = new Array<T>();

  constructor(
    private iterator: Iterator<T>,
    private equalsFunction: EqualsFunction<T> = (a, b) => a === b
  ) {}

  next(): IteratorResult<T> {
    for (
      let {value, done} = this.iterator.next();
      !done;
      {value, done} = this.iterator.next()
    ) {
      if (
        this.items.findIndex(cached => this.equalsFunction(cached, value)) ===
        -1
      ) {
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
  equalsFunction: EqualsFunction<T> = (a, b) => a === b
): OperationFunction<T, T> {
  return wrap(iterator => new DistinctByIterator(iterator, equalsFunction));
}
