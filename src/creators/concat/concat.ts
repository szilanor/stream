import {Stream} from '../../stream';

/**
 * Returns a Stream that yields elements of all Iterable parameters in order.
 */
export function concat<T>(...iterables: Iterable<T>[]): Stream<T> {
  return new Stream<T>(
    (function* () {
      for (const iterable of iterables) {
        yield* iterable;
      }
    })()
  );
}
