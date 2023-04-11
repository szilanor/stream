import {AsyncOperationFunction} from '../../types';
import {CallbackFunction, fromAsyncIteratorMapper} from '../../utils';

export class TapAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private callback: CallbackFunction<T>
  ) {}

  async next(): Promise<IteratorResult<T>> {
    const result = await this.iterator.next();
    if (!result.done) {
      this.callback(result.value, this.index++);
    }
    return result;
  }
}

/** Calls a callback function on each entry */
export function tapAsync<T>(
  callback: CallbackFunction<T>
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    iterator => new TapAsyncIterator(iterator, callback)
  );
}
