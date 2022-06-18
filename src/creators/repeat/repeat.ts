import {Stream} from '../../stream';

/**
 * Returns a Stream that yields the value a specified number
 * of times, or indefinitely if the 'times' parameter is omitted.
 */
export function repeat<T>(
  value: T,
  times: number = Number.POSITIVE_INFINITY
): Stream<T> {
  return new Stream<T>(
    (function* () {
      for (let i = 0; i < times; i++) {
        yield value;
      }
    })()
  );
}
