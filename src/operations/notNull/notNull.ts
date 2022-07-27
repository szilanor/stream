import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';

export function isNotNull<T>(
  value: T | null | undefined
): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNull<T>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return entries => new OfTypeIterator(entries[Symbol.iterator](), isNotNull);
}
