import {CollectorFunction} from '../../types';
import {first} from '../first';
import {
  callValueOrFactory,
  PredicateFunction,
  ValueOrFactory,
} from '../../utils';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function or the 'defaultValue'. */
export function firstOrDefault<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, T> {
  return source =>
    first<T>(predicate)(source) ?? callValueOrFactory(defaultValue);
}

export const findOrDefault = firstOrDefault;
