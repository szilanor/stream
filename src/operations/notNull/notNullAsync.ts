import {AsyncOperationFunction} from '../../types';
import {asyncOperationFunctionFactory} from '../../utils';
import {isNotNull} from './notNull.typeguard';
import {OfTypeAsyncIterator} from '../ofType/ofTypeAsync';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNullAsync<T>(): AsyncOperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return asyncOperationFunctionFactory(
    iterator => new OfTypeAsyncIterator(iterator, isNotNull)
  );
}
