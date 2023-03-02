import {CollectorFunction} from '../../types';
import {first} from '../first';
import {isFunction, PredicateFunction} from '../../utils';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function or the 'defaultValue'. */
export function firstOrDefault<T>(
  defaultValue: T | (() => T),
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, T> {
  return source =>
    first<T>(predicate)(source) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findOrDefault = firstOrDefault;
