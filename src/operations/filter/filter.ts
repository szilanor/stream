import {OperationFunction} from '../../types';
import {
  doneResult,
  monoTypeOperationToPrototypeFunction,
  valueResult,
  wrap,
} from '../../utils';
import {Stream} from '../../stream';

export class FilterIterator<T> implements Iterator<T> {
  index = 0;

  constructor(
    protected iterator: Iterator<T>,
    private predicate: (value: T, index: number) => boolean
  ) {}

  next(): IteratorResult<T> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.predicate(value, this.index++)) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filter<T>(
  func: (value: T, index: number) => boolean
): OperationFunction<T, T> {
  return wrap(iterator => new FilterIterator(iterator, func));
}

declare module '../../stream' {
  interface Stream<T> {
    filter(func: (value: T, index: number) => boolean): Stream<T>;
  }
}

Stream.prototype.filter = monoTypeOperationToPrototypeFunction(filter);
