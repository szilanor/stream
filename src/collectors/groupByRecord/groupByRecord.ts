import {CollectorFunction} from '../../types';

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupByRecord<T, TKey extends string | number | symbol>(
  keySelector: (entry: T) => TKey
): CollectorFunction<T, Record<TKey, T[]>> {
  return stream => {
    const result = {} as Record<TKey, T[]>;
    for (const entry of stream) {
      const key = keySelector(entry);
      const value = result[key];
      if (value) {
        value.push(entry);
      } else {
        result[key] = [entry];
      }
    }
    return result;
  };
}

export const group = groupByRecord;
