import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

export class OfTypeIterator<T, TOfType extends T> implements Iterator<TOfType> {
  constructor(
    private iterator: Iterator<T>,
    private predicate: (item: T) => item is TOfType
  ) {}

  next(): IteratorResult<TOfType> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.predicate(value)) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofType<T, TOfType extends T>(
  predicate: (item: T) => item is TOfType
): OperationFunction<T, TOfType> {
  return wrap(iterator => new OfTypeIterator(iterator, predicate));
}
