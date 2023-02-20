import {OperationFunction} from '../../types';
import {ConcatIterable} from '../../creators';

/** Concatenates the Iterable with other Iterables in order */
export function concatWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return iterable => new ConcatIterable([iterable, ...iterables]);
}
