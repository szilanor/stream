import {OperationFunction} from '../../types';
import {
  callValueOrFactory,
  ValueOrFactory,
  valueResult,
  wrap,
} from '../../utils';

class DefaultIfEmptyIterator<T> implements Iterator<T> {
  returnedValue = false;

  constructor(
    private iterator: Iterator<T>,
    private defaultValue: ValueOrFactory<T>
  ) {}

  next(): IteratorResult<T> {
    const result = this.iterator.next();
    if (!this.returnedValue) {
      this.returnedValue = true;
      if (result.done) {
        return valueResult(callValueOrFactory(this.defaultValue));
      }
    }
    return result;
  }
}

/** Returns an Iterable with the value parameter if the source Iterable is empty. */
export function defaultIfEmpty<T>(
  defaultValue: ValueOrFactory<T>
): OperationFunction<T, T> {
  return wrap(iterator => new DefaultIfEmptyIterator(iterator, defaultValue));
}
