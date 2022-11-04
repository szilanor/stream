import {AsyncCollectorFunction, CollectorFunction} from '../../types';

/** Creates a Map from an Iterable */
export function toRecord<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): CollectorFunction<T, Record<TKey, TValue>> {
  return stream => {
    const result = {} as Record<TKey, TValue>;
    for (const entry of stream) {
      result[keySelector(entry)] = valueSelector(entry);
    }
    return result;
  };
}

export function toRecordAsync<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey | PromiseLike<TKey>,
  valueSelector: (entry: T) => TValue | PromiseLike<TValue>
): AsyncCollectorFunction<T, Record<TKey, TValue>> {
  return async stream => {
    const result = {} as Record<TKey, TValue>;
    for await (const entry of stream) {
      result[await keySelector(entry)] = await valueSelector(entry);
    }
    return result;
  };
}
