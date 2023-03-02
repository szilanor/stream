import {OperationFunction} from '../../types';
import {isNotNullOrWhitespace, wrap} from '../../utils';
import {FilterIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespace(): OperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return wrap(
    iterator =>
      new FilterIterator<string | null | undefined, NonNullable<string>>(
        iterator,
        isNotNullOrWhitespace
      )
  );
}
