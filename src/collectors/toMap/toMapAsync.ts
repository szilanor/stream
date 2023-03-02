import {AsyncCollectorFunction} from '../../types';

/** Creates a Map from an Iterable */
export function toMapAsync<T, TKey, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): AsyncCollectorFunction<T, Map<TKey, TValue>> {
  return async source => {
    const result: Map<TKey, TValue> = new Map<TKey, TValue>();
    for await (const entry of source) {
      result.set(keySelector(entry), valueSelector(entry));
    }
    return result;
  };
}
