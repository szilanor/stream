import { Stream } from "~/stream";

function* combinationsGenerator<T>(iterable: Iterable<T>, r: number): Generator<T[]> {
  const pool = Array.from(iterable);
  const n = pool.length;

  if (r > n) {
    return;
  }

  const indices = Array.from({ length: r }, (_, i) => i);
  
  yield indices.map(i => pool[i]);

  while (true) {
    let i = r - 1;
    
    for (; i >= 0; i--) {
      if (indices[i] !== i + n - r) {
        break;
      }
    }

    if (i < 0) {
      return;
    }

    indices[i]++;

    for (let j = i + 1; j < r; j++) {
      indices[j] = indices[j - 1] + 1;
    }

    yield indices.map(k => pool[k]);
  }
}

/**
 * Returns a Stream that yields the combinations of the specified iterable.
 * @typeParam T Type of items in the Stream.
 * @param iterable Iterable to create the Stream from.
 * @param r Number of items to yield.
 * @returns Stream that yields the combinations of the specified iterable.
 *
 * @example
 * ```typescript
 * const result = combinations([1, 2, 3], 2);
 * console.log([...result]); // [[1, 2], [1, 3], [2, 3]]
 * ```
 */
export function combinations<T>(iterable: Iterable<T>, r: number): Stream<T[]> {
  return new Stream(combinationsGenerator(iterable, r));
}
