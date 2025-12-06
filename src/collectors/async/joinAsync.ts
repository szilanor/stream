import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/**
 * Returns a collector that returns a string of all entries in the Iterable joined together seperated a given string.
 * @param separator String to separate the entries.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns a string of all entries in the Iterable joined together seperated a given string.
 *
 * @example
 * ```typescript
 * const result = joinAsync(",")("hello");
 * console.log(result); // "hello"
 * ```
 */
export function joinAsync<T>(
  separator = ",",
): AsyncCollectorFunction<T, string> {
  return reduceAsync<T, string>((a, b) => `${a}${a && separator}${b}`, "");
}
