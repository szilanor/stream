import { OperationFunction } from "../../types";
import { doneResult, fromIteratorMapper, valueResult } from "../../utils";

class MapIterator<T, O> implements Iterator<O> {
  index = 0;

  constructor(
    protected iterator: Iterator<T>,
    private mapper: (value: T, index: number) => O,
  ) {}

  next(): IteratorResult<O> {
    const { value, done } = this.iterator.next();
    return done ? doneResult() : valueResult(this.mapper(value, this.index++));
  }
}

/**
 * Returns a Stream that yields elements from the source transformed by the mapper.
 * @param mapper Function to transform elements.
 * @typeParam T Type of items in the source.
 * @typeParam O Type of items in the result.
 * @returns Operation that yields elements from the source transformed by the mapper.
 * 
 * @example
 * ```typescript
 * const result = map((x) => x * 2)([1, 2, 3]);
 * console.log([...result]); // [2, 4, 6]
 * ```
 */
export function map<T, O>(
  mapper: (value: T, index: number) => O,
): OperationFunction<T, O> {
  return fromIteratorMapper((iterator) => new MapIterator(iterator, mapper));
}
