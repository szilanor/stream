import {CollectorFunction} from '../../types';

/** Creates a Map from an Iterable */
export function toMap<T, TKey, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): CollectorFunction<T, Map<TKey, TValue>> {
  return source => {
    const result: Map<TKey, TValue> = new Map<TKey, TValue>();
    for (const entry of source) {
      result.set(keySelector(entry), valueSelector(entry));
    }
    return result;
  };
}
