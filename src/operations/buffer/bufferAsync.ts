import { AsyncOperationFunction } from "../../types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "../../utils";

class BufferAsyncIterator<T> implements AsyncIterator<T[]> {
  private bufferArray: T[] = [];

  constructor(
    private iterator: AsyncIterator<T>,
    private size: number,
  ) {}

  async next(): Promise<IteratorResult<T[]>> {
    for (
      let { done, value } = await this.iterator.next();
      !done;
      { done, value } = await this.iterator.next()
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
export function bufferAsync<T>(size: number): AsyncOperationFunction<T, T[]> {
  return fromAsyncIteratorMapper(
    (iterator) => new BufferAsyncIterator(iterator, size),
  );
}
