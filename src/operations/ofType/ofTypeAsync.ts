import {AsyncOperationFunction} from '../../types';
import {TypeGuardFunction, wrapAsync} from '../../utils';
import {FilterAsyncIterator} from '../filter';

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofTypeAsync<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>
): AsyncOperationFunction<T, TOfType> {
  return wrapAsync(iterator => new FilterAsyncIterator(iterator, predicate));
}
