import { maxBy } from "../maxBy";

/**
 * Returns the maximum value in a sequence of numbers.
 * @param numbers Sequence of numbers to find the maximum value.
 * @returns Maximum value in the sequence.
 * 
 * @example
 * ```typescript
 * const result = max([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export const max = maxBy<number>((a, b) => a - b);
