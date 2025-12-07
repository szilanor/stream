import { OperationFunction } from "~/types";
import { filter } from "~/operations/sync/filter";

/**
 * Returns an OperationFunction that yields truthy elements from the source.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that yields truthy elements from the source.
 *
 * @example
 * ```typescript
 * const result = truthy<number>()([0, 1, 2, 3]);
 * console.log([...result]); // [1, 2, 3]
 * ```
 */
export function truthy<T>(): OperationFunction<T, T> {
  return filter((value) => !!value);
}
