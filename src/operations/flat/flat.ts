import {OperationFunction} from '../../types';

export function* flatGenerator<T>(iterable: Iterable<T[]>): Iterable<T> {
  for (const array of iterable) {
    yield* array;
  }
}

/** Returns an Iterable that yields the inner entries of array entries of the source Iterable. */
export function flat<T>(): OperationFunction<T[], T> {
  return flatGenerator;
}

export const flatten = flat;
