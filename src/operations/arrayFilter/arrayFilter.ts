import {OperationFunction} from '../../types';

function* arrayFilterGenerator<T>(
  source: Iterable<T[]>,
  predicate: (entry: T, index: number) => boolean
) {
  for (const entry of source) {
    yield entry.filter(predicate);
  }
}

/** Returns an Iterable that yields only array entries of the source Iterable that satisfy the function. */
export function arrayFilter<T>(
  predicate: (entry: T, index: number) => boolean
): OperationFunction<T[], T[]> {
  return source => arrayFilterGenerator(source, predicate);
}
