import {CollectorFunction} from '../../types';

/** Executes a reducer function on each entry of the Iterable, resulting in a single output value. */
export function reduce<T, O>(
  reducerFunction: (
    previousValue: O,
    currentValue: T,
    currentIndex: number
  ) => O,
  initialValue: O
): CollectorFunction<T, O> {
  return stream => {
    let prev = initialValue;
    let index = 0;
    for (const entry of stream) {
      prev = reducerFunction(prev, entry, index++);
    }
    return prev;
  };
}
