import { maxByAsync } from "./maxByAsync";

/**
 * Returns a collector that returns the largest value of all entries in the Iterable.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the largest value of all entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = maxAsync()([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export const maxAsync = maxByAsync<number>((a, b) => a - b);
