import { OperationFunction } from "../../types";
import { map } from "../map";

/**
 * Returns a Stream that yields elements from the source with their index.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields elements from the source with their index.
 *
 * @example
 * ```typescript
 * const result = withIndex<number>()([1, 2, 3]);
 * console.log([...result]); // [[1, 0], [2, 1], [3, 2]]
 * ```
 */
export function withIndex<T>(): OperationFunction<T, [T, number]> {
  return map((x, index) => [x, index]);
}
