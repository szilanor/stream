import {AnyToAsyncCollectorFunction} from '../../types';
import {getIterator, isPromise} from '../../utils';

/** Executes a reducer function on each entry of the Iterable, resulting in a single output value. */
export function reduceAsync<T, O>(
  reducerFunction: (
    previousValue: O,
    currentValue: T,
    currentIndex: number
  ) => O | PromiseLike<O>,
  initialValue: O
): AnyToAsyncCollectorFunction<T, O> {
  return async iterable => {
    const iterator = getIterator(iterable);
    let prev = initialValue;
    let index = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const nextValue = iterator.next();
      const {value, done} = isPromise(nextValue) ? await nextValue : nextValue;

      if (done) {
        break;
      }

      const result = reducerFunction(prev, value, index++);
      prev = isPromise(result) ? await result : result;
    }
    return prev;
  };
}
