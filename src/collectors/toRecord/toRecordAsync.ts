import {AsyncCollectorFunction} from '../../types';

/** Creates a Map from an Iterable */
export function toRecordAsync<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): AsyncCollectorFunction<T, Record<TKey, TValue>> {
  return async source => {
    const result = {} as Record<TKey, TValue>;
    for await (const entry of source) {
      result[keySelector(entry)] = valueSelector(entry);
    }
    return result;
  };
}

export const toObjectAsync = toRecordAsync;
