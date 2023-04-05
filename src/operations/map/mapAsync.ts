import {
  AsyncMapperFunction,
  doneResult,
  MapperFunction,
  valueResult,
  wrapAsync,
} from '../../utils';
import {AsyncOperationFunction} from '../../types';

class MapAsyncIterator<T, O> implements AsyncIterator<O> {
  index = 0;

  constructor(
    protected iterator: AsyncIterator<T>,
    private mapper: MapperFunction<T, O> | AsyncMapperFunction<T, O>
  ) {}

  async next(): Promise<IteratorResult<O>> {
    const {value, done} = await this.iterator.next();
    return done
      ? doneResult()
      : valueResult(await this.mapper(value, this.index++));
  }
}

/** Returns an Iterable that yields entries of the source Iterable transformed using the function */
export function mapAsync<T, O>(
  mapper: MapperFunction<T, O> | AsyncMapperFunction<T, O>
): AsyncOperationFunction<T, O> {
  return wrapAsync(iterator => new MapAsyncIterator(iterator, mapper));
}
