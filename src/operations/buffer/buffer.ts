import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class BufferIterator<T> implements Iterator<T[]> {
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
      const result = {done: false, value: this.bufferArray};
      this.bufferArray = [];
      return result;
    } else {
      return {done: true, value: undefined as unknown};
    }
  }
}

/** Returns an Iterable that yields array of entries of the source Iterable with the given length. */
export function buffer<T>(size: number): OperationFunction<T, T[]> {
  return operationFunctionFactory(
    iterator => new BufferIterator(iterator, size)
  );
}
