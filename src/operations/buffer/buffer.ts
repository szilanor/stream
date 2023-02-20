import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

class BufferIterator<T> implements Iterator<T[]> {
  private bufferArray: T[] = [];

  constructor(private iterator: Iterator<T>, private size: number) {}

  next(): IteratorResult<T[]> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      this.bufferArray.push(item.value);
      if (this.bufferArray.length === this.size) {
        const result = {done: item.done, value: this.bufferArray};
        this.bufferArray = [];
        return result;
      }
    }
    if (this.bufferArray.length) {
      const result = valueResult(this.bufferArray);
      this.bufferArray = [];
      return result;
    } else {
      return doneResult();
    }
  }
}

/** Returns an Iterable that yields array of entries of the source Iterable with the given length. */
export function buffer<T>(size: number): OperationFunction<T, T[]> {
  return wrap(iterator => new BufferIterator(iterator, size));
}
