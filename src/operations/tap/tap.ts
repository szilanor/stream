import {OperationFunction} from '../../types';
import {wrap} from '../../utils';

export class TapIterator<T> implements Iterator<T> {
  constructor(
    private iterator: Iterator<T>,
    private callback: (item: T) => void
  ) {}

  next(): IteratorResult<T> {
    const result = this.iterator.next();
    if (!result.done) {
      this.callback(result.value);
    }
    return result;
  }
}

/** Calls a callback function on each entry */
export function tap<T>(callback: (item: T) => void): OperationFunction<T, T> {
  return wrap(iterator => new TapIterator(iterator, callback));
}
