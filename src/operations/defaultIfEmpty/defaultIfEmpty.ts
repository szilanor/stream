import {OperationFunction} from '../../types';
import {isFunction, valueResult, wrap} from '../../utils';

class DefaultIfEmptyIterator<T> implements Iterator<T> {
  returnedValue = false;

  constructor(
    private iterator: Iterator<T>,
    private defaultValue: T | (() => T)
  ) {}

  next(): IteratorResult<T> {
    const result = this.iterator.next();
    if (!this.returnedValue) {
      this.returnedValue = true;
      if (result.done) {
        return valueResult(
          isFunction(this.defaultValue)
            ? this.defaultValue()
            : this.defaultValue
        );
      }
    }
    return result;
  }
}

/** Returns an Iterable with the value parameter if the source Iterable is empty. */
export function defaultIfEmpty<T>(
  defaultValue: T | (() => T)
): OperationFunction<T, T> {
  return wrap(iterator => new DefaultIfEmptyIterator(iterator, defaultValue));
}
