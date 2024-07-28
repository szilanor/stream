import { OperationFunction } from "../../types";
import { FilterIterator } from "../filter/filter";
import { fromIteratorMapper } from "../../utils";

/**
 * Returns a Stream that yields elements that are falsy.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields elements that are falsy.
 * 
 * @example
 * ```typescript
 * const result = falsy<number>()([0, 1, 2, 3, 4]);
 * console.log([...result]); // [0]
 * ```
 */
export function falsy<T>(): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new FilterIterator(iterator, (value) => !value),
  );
}
