import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType';
import {isNotNullOrEmpty, wrap} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmpty<T extends {length: number}>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return wrap(iterator => new OfTypeIterator(iterator, isNotNullOrEmpty));
}
