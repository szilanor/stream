import { OperationFunction } from "~/types";
import { fromIteratorMapper, isNotNullOrEmpty } from "~/utils";
import { FilterIterator } from "./filter";

/**
 * Returns an OperationFunction that yields elements that are not `null`, `undefined`, or empty.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that yields elements that are not `null`, `undefined`, or empty.
 *
 * @example
 * ```typescript
 * const result = notNullOrEmpty<string>()(["", "a", null, "b", undefined, "c"]);
 * console.log([...result]); // ["a", "b", "c"]
 * ```
 */
export function notNullOrEmpty<
  T extends { length: number },
>(): OperationFunction<T | null | undefined, NonNullable<T>> {
  return fromIteratorMapper(
    (iterator) =>
      new FilterIterator<T | null | undefined, NonNullable<T>>(
        iterator,
        isNotNullOrEmpty,
      ),
  );
}
