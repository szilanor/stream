import {AsyncCollectorFunction} from '../../types';
import {isFunction, PredicateFunction} from '../../utils';
import {lastAsync} from '../last';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastOrDefaultAsync<T>(
  defaultValue: T | (() => T) | Promise<T> | (() => Promise<T>),
  predicate: PredicateFunction<T> = () => true
): AsyncCollectorFunction<T, T | undefined> {
  return async source =>
    (await lastAsync(predicate)(source)) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findLastOrDefaultAsync = lastOrDefaultAsync;
