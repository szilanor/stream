import {OperationFunction} from '../../types';
import {FilterIterator} from '../filter/filter';

/** Returns an Iterable that yields only entries of the source Iterable with falsy value. */
export function falsy<T>(): OperationFunction<T, T> {
  return iterable => new FilterIterator(iterable, value => !value);
}
