import { OperationFunction } from "../../types";
import { FilterIterator } from "../filter/filter";
import { fromIteratorMapper } from "../../utils";

/**
 * Returns a Stream that yields truthy elements from the source.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields truthy elements from the source.
 *
 * @example
 * ```typescript
 * const result = truthy<number>()([0, 1, 2, 3]);
 * console.log([...result]); // [1, 2, 3]
 * ```
 */
export function truthy<T>(): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new FilterIterator(iterator, (value) => !!value),
  );
}
