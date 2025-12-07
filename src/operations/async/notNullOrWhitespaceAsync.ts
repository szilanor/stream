import { AsyncOperationFunction } from "~/types";
import { isNotNullOrWhitespace } from "~/utils";
import { ofTypeAsync } from "~/operations/async/ofTypeAsync";

/**
 * Returns an AsyncOperationFunction that yields only the non-null / non-undefined / non-empty entries of the source Iterable.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields only the non-null / non-undefined / non-empty entries of the source Iterable.
 *
 * @example
 * ```typescript
 * const result = notNullOrWhitespaceAsync<number>([1, 2, null, undefined, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function notNullOrWhitespaceAsync(): AsyncOperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return ofTypeAsync(isNotNullOrWhitespace);
}
