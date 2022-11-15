import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';
import {isNotNullOrEmpty} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmpty<T extends {length: number}>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return iterable => new OfTypeIterator(iterable, isNotNullOrEmpty);
}
