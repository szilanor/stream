import type {
  AsyncCollectorFunction,
  MaybeAsyncCallbackFunction,
} from "~/types";

/**
 * Returns a collector that calls a callback function on every entry.
 * @param callback A function that is called on every entry.
 * @typeParam T Type of items in the source.
 * @returns Collector that calls a callback function on every entry.
 */
export function forEachAsync<T>(
  callback: MaybeAsyncCallbackFunction<T>,
): AsyncCollectorFunction<T, void> {
  return async (source) => {
    let index = 0;
    for await (const entry of source) {
      await callback(entry, index++);
    }
  };
}
