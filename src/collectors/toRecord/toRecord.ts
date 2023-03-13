import {CollectorFunction} from '../../types';
import {reduce} from '../reduce';

/** Creates a Map from an Iterable */
export function toRecord<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): CollectorFunction<T, Record<TKey, TValue>> {
  return reduce(
    (result, entry) => {
      result[keySelector(entry)] = valueSelector(entry);
      return result;
    },
    () => ({} as Record<TKey, TValue>)
  );
}

export const toObject = toRecord;
