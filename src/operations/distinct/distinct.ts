import {OperationFunction} from '../../types';
import {
  doneResult,
  monoTypeOperationToPrototypeFunction,
  valueResult,
  wrap,
} from '../../utils';
import {Stream} from '../../stream';

export class DistinctIterator<T> implements Iterator<T> {
  private items: Set<T> = new Set<T>();

  constructor(protected iterator: Iterator<T>) {}

  next(): IteratorResult<T> {
    for (
      let {value, done} = this.iterator.next();
      !done;
      {value, done} = this.iterator.next()
    ) {
      if (!this.items.has(value)) {
        this.items.add(value);
        return valueResult(value);
      }
    }
    this.items.clear();
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinct<T>(): OperationFunction<T, T> {
  return wrap(iterator => new DistinctIterator(iterator));
}

declare module '../../stream' {
  interface Stream<T> {
    distinct(): Stream<T>;
  }
}

Stream.prototype.distinct = monoTypeOperationToPrototypeFunction(distinct);
