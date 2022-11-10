import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class TapIterator<T> implements Iterator<T> {
  constructor(
    private iterator: Iterator<T>,
    private callback: (item: T) => void
  ) {}

  next(): IteratorResult<T> {
    const item = this.iterator.next();
    if (!item.done) {
      this.callback(item.value);
    }
    return item;
  }
}

/** Calls a callback function on each entry */
export function tap<T>(callback: (item: T) => void): OperationFunction<T, T> {
  return operationFunctionFactory(
    iterator => new TapIterator(iterator, callback)
  );
}
