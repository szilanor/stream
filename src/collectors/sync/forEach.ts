import type { CollectorFunction, CallbackFunction } from "~/types";

/**
 * Returns a collector that executes a callback for each element in the source.
 * @param callback Callback function to execute for each element.
 * @typeParam T Type of items in the source.
 * @returns Collector that executes a callback for each element in the source.
 *
 * @example
 * ```typescript
 * forEach<number>((x) => console.log(x))([1, 2, 3]);
 * // 1
 * // 2
 * // 3
 * ```
 */
export function forEach<T>(
  callback: CallbackFunction<T>,
): CollectorFunction<T, void> {
  return (source) => {
    let index = 0;
    for (const entry of source) {
      callback(entry, index++);
    }
  };
}
