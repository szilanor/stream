import type {OperationFunction} from '../../types';

/**
 * Returns an Iterable that yields the inner entries of the
 * result produced by the function.
 */
export function flatMap<T, O>(
  func: (
    value: T,
    index: number
  ) => Iterable<O> | Generator<O, unknown, unknown>
): OperationFunction<T, O> {
  return entries =>
    (function* () {
      let index = 0;
      for (const entry of entries) {
        yield* func(entry, index++);
      }
    })();
}
