import { OperationFunction } from "~/types";
import { fromIteratorMapper, isNotNull } from "~/utils";
import { FilterIterator } from "./filter";

/**
 * Returns an OperationFunction that yields elements that are not `null`.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that yields elements that are not `null`.
 *
 * @example
 * ```typescript
 * const result = notNull<number>()([1, null, 2, null, 3]);
 * console.log([...result]); // [1, 2, 3]
 * ```
 */
export function notNull<T>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return fromIteratorMapper(
    (source) =>
      new FilterIterator<T | undefined | null, NonNullable<T>>(
        source,
        isNotNull,
      ),
  );
}
