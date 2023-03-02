import {AnyToAsyncCollectorFunction} from '../../types';
import {isFunction, PredicateFunction} from '../../utils';
import {firstAsync} from '../first';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function or the 'defaultValue'. */
export function firstOrDefaultAsync<T>(
  defaultValue: T | (() => T | Promise<T>),
  predicate: PredicateFunction<T> = () => true
): AnyToAsyncCollectorFunction<T, T> {
  return async source =>
    (await firstAsync(predicate)(source)) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findOrDefaultAsync = firstOrDefaultAsync;
