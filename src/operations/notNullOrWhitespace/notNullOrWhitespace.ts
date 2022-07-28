import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';

export function isNotNullOrWhitespace(
  value: string | null | undefined
): value is NonNullable<string> {
  return !!value && value.trim().length > 0;
}

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespace(): OperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return entries =>
    new OfTypeIterator(entries[Symbol.iterator](), isNotNullOrWhitespace);
}
