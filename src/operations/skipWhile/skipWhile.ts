import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';
import {PredicateFunction} from '../../utils/util-types';

export class SkipWhileIterator<T> implements Iterator<T> {
  index = 0;
  private skip = true;

  constructor(
    private iterator: Iterator<T>,
    private predicate: PredicateFunction<T>
  ) {}

  next(): IteratorResult<T> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.skip && (this.skip = this.predicate(value, this.index++)))
        continue;
      return valueResult(value);
    }
    return doneResult();
  }
}

/** Returns an Iterable skipping entries of the source Iterable while the parameter function returns true. */
export function skipWhile<T>(
  predicate: PredicateFunction<T>
): OperationFunction<T, T> {
  return wrap(iterator => new SkipWhileIterator(iterator, predicate));
}
