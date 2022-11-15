import {IterableIteratorBase, OperationFunction} from '../../types';

export class BufferIterator<T> extends IterableIteratorBase<T, T[]> {
  private bufferArray: T[] = [];

  constructor(iterable: Iterable<T>, private size: number) {
    super(iterable);
  }

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
      const result = this.valueResult(this.bufferArray);
      this.bufferArray = [];
      return result;
    } else {
      return this.doneResult();
    }
  }
}

/** Returns an Iterable that yields array of entries of the source Iterable with the given length. */
export function buffer<T>(size: number): OperationFunction<T, T[]> {
  return iterable => new BufferIterator(iterable, size);
}
