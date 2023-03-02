import {CollectorFunction} from '../../types';

/** Creates a Map from an Iterable */
export function toRecord<T, TKey extends string | number | symbol, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue
): CollectorFunction<T, Record<TKey, TValue>> {
  return source => {
    const result = {} as Record<TKey, TValue>;
    for (const entry of source) {
      result[keySelector(entry)] = valueSelector(entry);
    }
    return result;
  };
}

export const toObject = toRecord;
