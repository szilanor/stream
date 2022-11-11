import {AnyToAsyncCollectorFunction} from '../../types';
import {getIterator, isPromise} from '../../utils';

/** Creates a Map from an Iterable */
export function toRecordAsync<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey | PromiseLike<TKey>,
  valueSelector: (entry: T) => TValue | PromiseLike<TValue>
): AnyToAsyncCollectorFunction<T, Record<TKey, TValue>> {
  return async stream => {
    const iterator = getIterator(stream);
    const result = {} as Record<TKey, TValue>;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const nextValue = iterator.next();
      const {value, done} = isPromise(nextValue) ? await nextValue : nextValue;

      if (done) {
        break;
      }

      const keyResult = keySelector(value);
      const valueResult = valueSelector(value);

      result[isPromise(keyResult) ? await keyResult : keyResult] = isPromise(
        valueResult
      )
        ? await valueResult
        : valueResult;
    }
    return result;
  };
}
