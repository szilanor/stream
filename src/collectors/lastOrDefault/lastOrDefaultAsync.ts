import {AnyToAsyncCollectorFunction} from '../../types';
import {isFunction} from '../../utils';
import {lastAsync} from '../last';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastOrDefaultAsync<T>(
  defaultValue: T | (() => T) | Promise<T> | (() => Promise<T>),
  predicate: (item: T) => boolean = () => true
): AnyToAsyncCollectorFunction<T, T | undefined> {
  return async stream =>
    (await lastAsync(predicate)(stream)) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findLastOrDefaultAsync = lastOrDefaultAsync;
