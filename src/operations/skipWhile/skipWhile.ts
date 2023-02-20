import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

export class SkipWhileIterator<T> implements Iterator<T> {
  private skip = true;

  constructor(
    private iterator: Iterator<T>,
    private predicate: (entry: T) => boolean
  ) {}

  next(): IteratorResult<T> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.skip && (this.skip = this.predicate(value))) continue;
      return valueResult(value);
    }
    return doneResult();
  }
}

/** Returns an Iterable skipping entries of the source Iterable while the parameter function returns true. */
export function skipWhile<T>(
  predicate: (entry: T) => boolean
): OperationFunction<T, T> {
  return wrap(iterator => new SkipWhileIterator(iterator, predicate));
}
