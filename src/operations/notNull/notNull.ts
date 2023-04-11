import {OperationFunction} from '../../types';
import {fromIteratorMapper, isNotNull} from '../../utils';
import {FilterIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNull<T>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return fromIteratorMapper(
    source =>
      new FilterIterator<T | undefined | null, NonNullable<T>>(
        source,
        isNotNull
      )
  );
}
