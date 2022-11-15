import {AsyncOperationFunction} from '../../types';
import {OfTypeAsyncIterator} from '../ofType/ofTypeAsync';
import {isNotNullOrEmpty} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmptyAsync<
  T extends {length: number}
>(): AsyncOperationFunction<T | undefined | null, NonNullable<T>> {
  return iterable => new OfTypeAsyncIterator(iterable, isNotNullOrEmpty);
}
