import {AsyncOperationFunction} from '../../types';
import {fromAsyncIteratorMapper, TypeGuardFunction} from '../../utils';
import {FilterAsyncIterator} from '../filter';

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofTypeAsync<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>
): AsyncOperationFunction<T, TOfType> {
  return fromAsyncIteratorMapper(
    iterator => new FilterAsyncIterator(iterator, predicate)
  );
}
