import { Stream } from "~/stream";

function* cycle_generator<T>(iterable: Iterable<T>): Iterable<T> {
  while (true) {
    yield* iterable;
  }
}

/**
 * Returns a Stream that infinitely yields elements of the Iterable parameter.
 * @param iterable Iterable to cycle.
 * @typeParam T Type of items in the iterable.
 * @returns Stream that yields elements of the iterable infinitely.
 *
 * @example
 * ```typescript
 * const result = cycle<number>([1, 2, 3]);
 * console.log(result); // [1, 2, 3, 1, 2, 3, ...]
 * ```
 */
export function cycle<T>(iterable: Iterable<T>): Stream<T> {
  return new Stream(cycle_generator(iterable));
}
