import {OperationFunction} from '../../types';
import {doneResult, fromIteratorMapper, valueResult} from '../../utils';

class BufferIterator<T> implements Iterator<T[]> {
  private bufferArray: T[] = [];

  constructor(private iterator: Iterator<T>, private size: number) {}

  next(): IteratorResult<T[]> {
    for (
      let {value, done} = this.iterator.next();
      !done;
      {value, done} = this.iterator.next()
    ) {
      this.bufferArray.push(value);
      if (this.bufferArray.length === this.size) {
        const result = valueResult(this.bufferArray);
        this.bufferArray = [];
        return result;
      }
    }
    if (this.bufferArray.length) {
      const result = valueResult(this.bufferArray);
      this.bufferArray = [];
      return result;
    }
    return doneResult();
  }
}

/** Returns an Iterable that yields array of entries of the source Iterable with the given length. */
export function buffer<T>(size: number): OperationFunction<T, T[]> {
  return fromIteratorMapper(iterator => new BufferIterator(iterator, size));
}
