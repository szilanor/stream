import { minBy } from "./minBy";

/**
 * Returns a collector that returns the minimum value in a sequence of numbers.
 * @returns Collector that returns the minimum value in a sequence of numbers.
 *
 * @example
 * ```typescript
 * const result = min<number>()([1, 2, 3]);
 * console.log(result); // 1
 * ```
 */
export const min = minBy<number>((a, b) => a - b);
