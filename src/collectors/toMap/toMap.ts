import {CollectorFunction} from '../../types';
import {reduce} from '../reduce';

/** Creates a Map from an Iterable */
export function toMap<T, TKey, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): CollectorFunction<T, Map<TKey, TValue>> {
  return reduce<T, Map<TKey, TValue>>(
    (result, entry) => result.set(keySelector(entry), valueSelector(entry)),
    () => new Map<TKey, TValue>()
  );
}
