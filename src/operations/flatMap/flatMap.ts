import type {OperationFunction} from '../../types';

export function* flatMapGenerator<T, O>(
  iterable: Iterable<T>,
  mapper: (value: T, index: number) => Iterable<O>
): Iterable<O> {
  let index = 0;
  for (const entry of iterable) {
    yield* mapper(entry, index++);
  }
}

/**
 * Returns an Iterable that yields the inner entries of the
 * result produced by the function.
 */
export function flatMap<T, O>(
  mapper: (value: T, index: number) => Iterable<O>
): OperationFunction<T, O> {
  return source => flatMapGenerator(source, mapper);
}
