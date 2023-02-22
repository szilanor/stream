import {CollectorFunction} from '../../types';
import {first} from '../first';
import {isFunction} from '../../utils';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function or the 'defaultValue'. */
export function firstOrDefault<T>(
  defaultValue: T | (() => T),
  predicate: (item: T) => boolean = () => true
): CollectorFunction<T, T> {
  return stream =>
    first<T>(predicate)(stream) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findOrDefault = firstOrDefault;
