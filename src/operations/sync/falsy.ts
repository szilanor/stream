import { OperationFunction } from "~/types";
import { filter } from "~/operations/sync/filter";

/**
 * Returns an OperationFunction that yields elements that are falsy.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that yields elements that are falsy.
 *
 * @example
 * ```typescript
 * const result = falsy<number>()([0, 1, 2, 3, 4]);
 * console.log([...result]); // [0]
 * ```
 */
export function falsy<T>(): OperationFunction<T, T> {
  return filter((value) => !value);
}
