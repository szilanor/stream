import {CollectorFunction} from '../../types';
import {reduce} from '../reduce/reduce';

/** Returns a string of all entries in the Iterable joined together seperated a given string. */
export function join<T>(separator = ','): CollectorFunction<T, string> {
  return reduce<T, string>((a, b) => `${a}${a && separator}${b}`, '');
}
