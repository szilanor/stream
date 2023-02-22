import {AnyToAsyncCollectorFunction} from '../../types';
import {isFunction} from '../../utils';
import {firstAsync} from '../first';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function or the 'defaultValue'. */
export function firstOrDefaultAsync<T>(
  defaultValue: T | (() => T | Promise<T>),
  predicate: (item: T) => boolean | Promise<boolean> = () => true
): AnyToAsyncCollectorFunction<T, T> {
  return async stream =>
    (await firstAsync(predicate)(stream)) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findOrDefaultAsync = firstOrDefaultAsync;
