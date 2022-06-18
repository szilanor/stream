import {Stream} from '../../stream';

/**
 * Returns a Stream that yields a range of values.
 */
export function range(start: number, count: number, by = 1): Stream<number> {
  return new Stream<number>(
    (function* () {
      for (let i = 0; i < count; i++) yield start + i * by;
    })()
  );
}
