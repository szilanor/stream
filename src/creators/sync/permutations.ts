import { Stream } from "~/stream";

function* permutationsGenerator<T>(iterable: Iterable<T>, r?: number): Generator<T[]> {
  const pool = Array.from(iterable);
  const n = pool.length;
  const rSize = r === undefined ? n : r;

  if (rSize > n) {
    return;
  }

  const indices = Array.from({ length: n }, (_, i) => i);
  const cycles = Array.from({ length: rSize }, (_, i) => n - i);

  yield indices.slice(0, rSize).map(i => pool[i]);

  const nSize = n;

  while (nSize > 0) {
    let broken = false;
    for (let i = rSize - 1; i >= 0; i--) {
      cycles[i] -= 1;
      
      if (cycles[i] === 0) {
        const moved = indices[i];
        for (let k = i; k < nSize - 1; k++) {
            indices[k] = indices[k + 1];
        }
        indices[nSize - 1] = moved;
        
        cycles[i] = nSize - i;
      } else {
        const j = cycles[i];
        const swapIndex = indices.length - j;
        
        [indices[i], indices[swapIndex]] = [indices[swapIndex], indices[i]];
        
        yield indices.slice(0, rSize).map(idx => pool[idx]);
        broken = true;
        break;
      }
    }
    
    if (!broken) {
      return;
    }
  }
}

/**
 * Returns a Stream that yields the permutations of the specified iterable.
 * @typeParam T Type of items in the Stream.
 * @param iterable Iterable to create the Stream from.
 * @param r Number of items to yield.
 * @returns Stream that yields the permutations of the specified iterable.
 *
 * @example
 * ```typescript
 * const result = permutations([1, 2, 3], 2);
 * console.log([...result]); // [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]
 * ```
 */
export function permutations<T>(iterable: Iterable<T>, r?: number): Stream<T[]> {
  return new Stream(permutationsGenerator(iterable, r));
}
