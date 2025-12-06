import { minByAsync } from "./minByAsync";

/**
 * Returns a collector that returns the smallest value of all entries in the Iterable.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the smallest value of all entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = minAsync()([1, 2, 3]);
 * console.log(result); // 1
 * ```
 */
export const minAsync = minByAsync<number>((a, b) => a - b);
