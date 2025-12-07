import { OperationFunction, TypeGuardFunction } from "~/types";
import { filter } from "~/operations/sync/filter";

/**
 * Returns an OperationFunction that yields elements that are of the specified type.
 * @typeParam T Type of items in the source.
 * @typeParam TOfType Type of items to yield.
 * @param predicate A function that determines if an item is of the specified type.
 * @returns An OperationFunction that yields elements that are of the specified type.
 *
 * @example
 * ```typescript
 * const result = ofType<string, string>()(Number)(["a", 1, "b", 2]);
 * console.log([...result]); // [1, 2]
 * ```
 */
export function ofType<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>,
): OperationFunction<T, TOfType> {
  return filter(predicate);
}
