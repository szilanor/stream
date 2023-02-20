import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType';
import {isNotNullOrWhitespace, wrap} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespace(): OperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return wrap(iterator => new OfTypeIterator(iterator, isNotNullOrWhitespace));
}
