import { Stream } from "../../stream";

function* cycle_generator<T>(iterable: Iterable<T>): Iterable<T> {
  while (true) {
    yield* iterable;
  }
}

/**
 * Returns a Stream that infinitely yields elements of the Iterable parameter.
 */
export function cycle<T>(iterable: Iterable<T>): Stream<T> {
  return new Stream(cycle_generator(iterable));
}
