import {OperationFunction} from '../../types';
import {FilterIterator} from '../filter';
import {fromIteratorMapper} from '../../utils';

/** Returns an Iterable that yields only entries of the source Iterable with truthy value. */
export function truthy<T>(): OperationFunction<T, T> {
  return fromIteratorMapper(
    iterator => new FilterIterator(iterator, value => !!value)
  );
}
