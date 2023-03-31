import type {AsyncOperationFunction} from '../../types';
import {compoundAsync} from '../compound';
import {mapAsync} from '../map';
import {flatAsync} from '../flat/flatAsync';

/**
 * Returns an Iterable that yields the inner entries of the
 * result produced by the function.
 */
export function flatMapAsync<T, O>(
  mapper: (value: T, index: number) => Iterable<O>
): AsyncOperationFunction<T, O> {
  return compoundAsync(mapAsync(mapper), flatAsync());
}
