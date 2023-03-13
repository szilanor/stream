import {AsyncCollectorFunction} from '../../types';
import {reduceAsync} from '../reduce';

/** Creates a Map from an Iterable */
export function toRecordAsync<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): AsyncCollectorFunction<T, Record<TKey, TValue>> {
  return reduceAsync(
    (result, entry) => {
      result[keySelector(entry)] = valueSelector(entry);
      return result;
    },
    () => ({} as Record<TKey, TValue>)
  );
}

export const toObjectAsync = toRecordAsync;
