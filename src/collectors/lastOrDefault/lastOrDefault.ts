import {CollectorFunction} from '../../types';
import {last} from '../last';
import {isFunction} from '../../utils';
import {PredicateFunction} from '../../utils/util-types';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastOrDefault<T>(
  defaultValue: T | (() => T),
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, T | undefined> {
  return source =>
    last(predicate)(source) ??
    (isFunction(defaultValue) ? defaultValue() : defaultValue);
}

export const findLastOrDefault = lastOrDefault;
