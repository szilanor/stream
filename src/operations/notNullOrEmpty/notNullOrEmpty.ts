import {OperationFunction} from '../../types';
import {isNotNullOrEmpty, wrap} from '../../utils';
import {FilterIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmpty<T extends {length: number}>(): OperationFunction<
  T | null | undefined,
  NonNullable<T>
> {
  return wrap(
    iterator =>
      new FilterIterator<T | null | undefined, NonNullable<T>>(
        iterator,
        isNotNullOrEmpty
      )
  );
}
