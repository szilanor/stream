import { maxBy } from "./maxBy";

/**
 * Returns a collector that returns the maximum value in a sequence of numbers.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the maximum value in a sequence of numbers.
 *
 * @example
 * ```typescript
 * const result = max()([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export const max = maxBy<number>((a, b) => a - b);
