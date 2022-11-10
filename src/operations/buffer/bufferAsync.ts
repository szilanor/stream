import {AsyncOperationFunction} from '../../types';
import {asyncOperationFunctionFactory} from '../../utils';

export class BufferAsyncIterator<T> implements AsyncIterator<T[]> {
  private bufferArray: T[] = [];

  constructor(private iterator: AsyncIterator<T>, private size: number) {}

  async next(): Promise<IteratorResult<T[]>> {
    for (
      let item = await this.iterator.next();
      !item.done;
      item = await this.iterator.next()
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
export function bufferAsync<T>(size: number): AsyncOperationFunction<T, T[]> {
  return asyncOperationFunctionFactory(
    iterator => new BufferAsyncIterator(iterator, size)
  );
}
