import type { OperationFunction } from "../../types";
import { compound } from "../compound";
import { map } from "../map";
import { flat } from "../flat";

/**
 * Maps each element to an Iterable and flattens the result.
 * @param mapper Mapping function.
 * @typeParam T Type of items in the source.
 * @typeParam O Type of items in the resulting Iterable.
 * @returns Operation that maps each element to an Iterable and flattens the result.
 *
 * @example
 * ```typescript
 * const result = flatMap<number, number>((value) => [value, value + 1])([1, 2, 3]);
 * console.log([...result]); // [1, 2, 2, 3, 3, 4]
 * ```
 */
export function flatMap<T, O>(
  mapper: (value: T, index: number) => Iterable<O>,
): OperationFunction<T, O> {
  return compound(map(mapper), flat());
}
