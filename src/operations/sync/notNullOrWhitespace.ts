import { OperationFunction } from "~/types";
import { fromIteratorMapper, isNotNullOrWhitespace } from "~/utils";
import { FilterIterator } from "./filter";

/**
 * Returns an OperationFunction that yields elements that are not `null`, `undefined`, or whitespace.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that yields elements that are not `null`, `undefined`, or whitespace.
 *
 * @example
 * ```typescript
 * const result = notNullOrWhitespace<string>()(["", "a", null, "b", undefined, "c", " "]);
 * console.log([...result]); // ["a", "b", "c"]
 * ```
 */
export function notNullOrWhitespace(): OperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return fromIteratorMapper(
    (iterator) =>
      new FilterIterator<string | null | undefined, NonNullable<string>>(
        iterator,
        isNotNullOrWhitespace,
      ),
  );
}
