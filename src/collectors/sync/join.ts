import type { CollectorFunction } from "~/types";
import { reduce } from "./reduce";

/**
 * Joins the source into a string.
 * @param separator Separator between elements.
 * @typeParam T Type of items in the source.
 * @returns Collector that joins the source into a string.
 *
 * @example
 * ```typescript
 * const result = join<number>()([1, 2, 3]);
 * console.log(result); // "1,2,3"
 * ```
 */
export function join<T>(separator = ","): CollectorFunction<T, string> {
  return reduce<T, string>((a, b) => `${a}${a && separator}${b}`, "");
}
