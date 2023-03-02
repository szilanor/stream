import {AnyToAsyncCollectorFunction} from '../../types';
import {AsyncReduceFunction} from '../../utils';

/** Executes a reducer function on each entry of the Iterable, resulting in a single output value. */
export function reduceAsync<T, O>(
  reducerFunction: AsyncReduceFunction<T, O>,
  initialValue: O
): AnyToAsyncCollectorFunction<T, O> {
  return async stream => {
    let prev = initialValue;
    let index = 0;
    for await (const entry of stream) {
      prev = await reducerFunction(prev, entry, index++);
    }
    return prev;
  };
}
