import { minBy } from "../minBy";

/**
 * Returns the minimum value in a sequence of numbers.
 * @param numbers Sequence of numbers to find the minimum value.
 * @returns Minimum value in the sequence.
 * 
 * @example
 * ```typescript
 * const result = min([1, 2, 3]);
 * console.log(result); // 1
 * ```
 */
export const min = minBy<number>((a, b) => a - b);
