import {OperationFunction} from '../../types';
import {doneResult, EqualsFunction, valueResult, wrap} from '../../utils';

class DistinctUntilChangedIterator<T> implements Iterator<T> {
  private previous?: T;

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
      if (!this.previous || !this.equalsFunction(value, this.previous)) {
        this.previous = value;
        return valueResult(value);
      }
    }
    this.previous = undefined;
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctUntilChanged<T>(
  equalsFunction?: EqualsFunction<T>
): OperationFunction<T, T> {
  return wrap(
    iterator => new DistinctUntilChangedIterator(iterator, equalsFunction)
  );
}
