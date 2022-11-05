import {AsyncCollectorFunction, CollectorFunction} from '../../types';
import {reduce, reduceAsync} from '../reduce/reduce';

const reducerFunction = (prev: number | undefined, curr: number) =>
  prev === undefined ? curr : prev + curr;

/** Return the sum of all entries in the Iterable */
export function sum(): CollectorFunction<number, number | undefined> {
  return reduce(reducerFunction, undefined);
}

export function sumAsync(): AsyncCollectorFunction<number, number | undefined> {
  return reduceAsync(reducerFunction, undefined);
}
