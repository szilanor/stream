import {AsyncOperationFunction} from '../../types';
import {OfTypeAsyncIterator} from '../ofType/ofTypeAsync';
import {isNotNull} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNullAsync<T>(): AsyncOperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return iterable => new OfTypeAsyncIterator(iterable, isNotNull);
}
