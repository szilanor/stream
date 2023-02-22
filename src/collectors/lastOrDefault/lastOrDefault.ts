import {CollectorFunction} from '../../types';
import {last} from '../last';
import {isFunction} from '../../utils';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastOrDefault<T>(
  defaultValue: T | (() => T),
  predicate: (item: T) => boolean = () => true
): CollectorFunction<T, T | undefined> {
  return stream =>
    last(predicate)(stream) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findLastOrDefault = lastOrDefault;
