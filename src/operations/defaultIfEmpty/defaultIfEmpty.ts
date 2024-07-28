import { OperationFunction } from "../../types";
import {
  callValueOrFactory,
  fromIteratorMapper,
  ValueOrFactory,
  valueResult,
} from "../../utils";

class DefaultIfEmptyIterator<T> implements Iterator<T> {
  returnedValue = false;

  constructor(
    private iterator: Iterator<T>,
    private defaultValue: ValueOrFactory<T>,
  ) {}

  next(): IteratorResult<T> {
    const result = this.iterator.next();
    if (!this.returnedValue) {
      this.returnedValue = true;
      if (result.done) {
        return valueResult(callValueOrFactory(this.defaultValue));
      }
    }
    return result;
  }
}

/**
 * Emits a default value if the source is empty.
 * @param defaultValue Value to emit if the source is empty.
 * @typeParam T Type of items emitted by the source.
 * @returns Operation that emits a default value if the source is empty.
 * 
 * @example
 * ```typescript
 * const result = defaultIfEmpty('A')([]);
 * console.log([...result]); // ['A']
 * ```
 */
export function defaultIfEmpty<T>(
  defaultValue: ValueOrFactory<T>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new DefaultIfEmptyIterator(iterator, defaultValue),
  );
}
