import { OperationFunction, EqualsFunction } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

class DistinctUntilKeyChangedIterator<T, K extends keyof T>
  implements Iterator<T>
{
  private previous?: T[K];

  constructor(
    private iterator: Iterator<T>,
    private key: K,
    private equalsFunction: EqualsFunction<T[K]> = (a, b) => a === b,
  ) {}

  next(): IteratorResult<T> {
    for (
      let { value, done } = this.iterator.next();
      !done;
      { value, done } = this.iterator.next()
    ) {
      const keyValue = value[this.key];
      if (!this.previous || !this.equalsFunction(keyValue, this.previous)) {
        this.previous = keyValue;
        return valueResult(value);
      }
    }
    this.previous = undefined;
    return doneResult();
  }
}

/**
 * Returns a Stream that yields elements from the source that are distinct from the previous element based on the key.
 * @param key Key to compare elements.
 * @param equalsFunction Function to compare elements.
 * @typeParam T Type of items in the source.
 *
 * @example
 * ```typescript
 * const result = distinctUntilKeyChanged('a')([{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }, { a: 3 }]);
 * console.log([...result]); // [{ a: 1 }, { a: 2 }, { a: 3 }]
 * ```
 */
export function distinctUntilKeyChanged<T, K extends keyof T>(
  key: K,
  equalsFunction?: EqualsFunction<T[K]>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) =>
      new DistinctUntilKeyChangedIterator(iterator, key, equalsFunction),
  );
}
