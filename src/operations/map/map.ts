import {OperationFunction} from '../../types';

/** Returns an Iterable that yields entries of the source Iterable transformed using the function */
export function map<T, O>(
  func: (value: T, index: number) => O
): OperationFunction<T, O> {
  return entries =>
    (function* () {
      let index = 0;
      for (const entry of entries) {
        yield func(entry, index++);
      }
    })();
}
