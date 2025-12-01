import { OperationFunction, CallbackFunction } from "~/types";
import { fromIteratorMapper } from "~/utils";

class TapIterator<T> implements Iterator<T> {
  index = 0;

  constructor(
    private iterator: Iterator<T>,
    private callback: CallbackFunction<T>,
  ) {}

  next(): IteratorResult<T> {
    const result = this.iterator.next();
    if (!result.done) {
      this.callback(result.value, this.index++);
    }
    return result;
  }
}

/**
 * Invokes a callback for each element in the source.
 * @param callback Callback function to invoke for each element.
 * @typeParam T Type of items in the source.
 * @returns Operation that invokes a callback for each element in the source.
 *
 * @example
 * ```typescript
 * const result = tap<number>((x) => console.log(x))([1, 2, 3]);
 * // Logs:
 * // 1
 * // 2
 * // 3
 * console.log([...result]); // [1, 2, 3]
 * ```
 */
export function tap<T>(callback: CallbackFunction<T>): OperationFunction<T, T> {
  return fromIteratorMapper((iterator) => new TapIterator(iterator, callback));
}
