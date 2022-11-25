import {OperationFunction} from '../../types';
import {FilterIterator} from '../filter';
import {mapIterator} from '../../utils';

/** Returns an Iterable that yields only entries of the source Iterable with falsy value. */
export function falsy<T>(): OperationFunction<T, T> {
  return mapIterator(iterator => new FilterIterator(iterator, value => !value));
}
