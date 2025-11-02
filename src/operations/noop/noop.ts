import { OperationFunction } from "../../types";

/**
 * Returns a Stream that yields the same elements as the source.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields the same elements as the source.
 *
 * @example
 * ```typescript
 * const result = noop<number>()([1, 2, 3]);
 * console.log([...result]); // [1, 2, 3]
 * ```
 */
export function noop<T>(): OperationFunction<T, T> {
  return (source) => source;
}
