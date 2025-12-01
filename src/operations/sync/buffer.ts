import { OperationFunction } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

class BufferIterator<T> implements Iterator<T[]> {
  private bufferArray: T[] = [];

  constructor(
    private iterator: Iterator<T>,
    private size: number,
  ) {}

  next(): IteratorResult<T[]> {
    for (
      let { value, done } = this.iterator.next();
      !done;
      { value, done } = this.iterator.next()
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

/**
 * Buffers the source elements into arrays of 'size' elements.
 * @param size The number of elements in each buffer.
 * @typeParam T Type of the elements.
 * @returns Operation that buffers the source elements.
 *
 * @example
 * ```typescript
 * const result = buffer(3)([1, 2, 3, 4, 5, 6]);
 * console.log([...result]); // [[1, 2, 3], [4, 5, 6]]
 * ```
 */
export function buffer<T>(size: number): OperationFunction<T, T[]> {
  return fromIteratorMapper((iterator) => new BufferIterator(iterator, size));
}
