import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';
import {isNotNullOrWhitespace} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespace(): OperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return iterable => new OfTypeIterator(iterable, isNotNullOrWhitespace);
}
