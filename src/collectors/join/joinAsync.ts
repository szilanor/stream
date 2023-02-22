import {AsyncCollectorFunction} from '../../types';
import {reduceAsync} from '../reduce';

/** Returns a string of all entries in the Iterable joined together seperated a given string. */
export function joinAsync<T>(
  separator = ','
): AsyncCollectorFunction<T, string> {
  return reduceAsync<T, string>((a, b) => `${a}${a && separator}${b}`, '');
}
