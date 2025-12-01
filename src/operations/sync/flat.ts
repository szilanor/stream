import { OperationFunction } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

class FlatIterator<T> implements Iterator<T> {
  private current: Iterator<T> | null = null;

  constructor(private readonly iterator: Iterator<Iterable<T>>) {}

  next(): IteratorResult<T> {
    while (true) {
      if (this.current) {
        const { value, done } = this.current.next();
        if (!done) {
          return valueResult(value);
        }
        this.current = null;
      }

      const { value, done } = this.iterator.next();
      if (done) {
        return doneResult();
      }

      this.current = value[Symbol.iterator]();
    }
  }
}

/**
 * Returns a Stream that yields elements from the source that are Iterable and flattens them.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields elements from the source that are Iterable and flattens them.
 *
 * @example
 * ```typescript
 * const result = flat<number>()([[1, 2], [3, 4]]);
 * console.log([...result]); // [1, 2, 3, 4]
 * ```
 */
export function flat<T>(): OperationFunction<Iterable<T>, T> {
  return fromIteratorMapper((iterator) => new FlatIterator(iterator));
}

export const flatten = flat;
