import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';
import {isNotNull} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNull<T>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return iterable => new OfTypeIterator(iterable, isNotNull);
}
