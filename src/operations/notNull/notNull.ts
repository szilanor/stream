import {OperationFunction} from '../../types';
import {isNotNull, wrap} from '../../utils';
import {FilterIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNull<T>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return wrap(
    source =>
      new FilterIterator<T | undefined | null, NonNullable<T>>(
        source,
        isNotNull
      )
  );
}
