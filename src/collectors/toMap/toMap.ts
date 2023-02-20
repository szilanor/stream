import {CollectorFunction} from '../../types';

/** Creates a Map from an Iterable */
export function toMap<T, TKey, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): CollectorFunction<T, Map<TKey, TValue>> {
  return stream => {
    const result: Map<TKey, TValue> = new Map<TKey, TValue>();
    for (const entry of stream) {
      result.set(keySelector(entry), valueSelector(entry));
    }
    return result;
  };
}
