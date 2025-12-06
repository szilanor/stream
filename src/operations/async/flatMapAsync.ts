import { AsyncOperationFunction } from "~/types";
import { compoundAsync } from "./compoundAsync";
import { mapAsync } from "./mapAsync";
import { flatAsync } from "./flatAsync";

/**
 * Returns an AsyncOperationFunction that yields the inner entries of the
 * result produced by the function.
 * @param mapper The function to use to map the entries.
 * @typeParam T The type of the elements in the source Iterable.
 * @typeParam O The type of the elements in the result Iterable.
 * @returns An AsyncOperationFunction that yields the inner entries of the
 * result produced by the function.
 *
 * @example
 * ```typescript
 * const result = flatMapAsync<number, number>([1, 2, 3], (value) => [value, value * 2]);
 * console.log(result); // [1, 2, 2, 4, 3, 6]
 * ```
 */
export function flatMapAsync<T, O>(
  mapper: (value: T, index: number) => Iterable<O>,
): AsyncOperationFunction<T, O> {
  return compoundAsync(mapAsync(mapper), flatAsync());
}
