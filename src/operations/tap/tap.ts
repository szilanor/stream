import {OperationFunction} from '../../types';
import {CallbackFunction, wrap} from '../../utils';

export class TapIterator<T> implements Iterator<T> {
  index = 0;

  constructor(
    private iterator: Iterator<T>,
    private callback: CallbackFunction<T>
  ) {}

  next(): IteratorResult<T> {
    const result = this.iterator.next();
    if (!result.done) {
      this.callback(result.value, this.index++);
    }
    return result;
  }
}

/** Calls a callback function on each entry */
export function tap<T>(callback: CallbackFunction<T>): OperationFunction<T, T> {
  return wrap(iterator => new TapIterator(iterator, callback));
}
