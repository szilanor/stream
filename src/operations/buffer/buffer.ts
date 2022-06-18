import {OperationFunction} from '../../types';

/** Returns an Iterable that yields array of entries of the source Iterable with the given length. */
export function buffer<T>(size: number): OperationFunction<T, T[]> {
  return entries =>
    (function* () {
      let bufferArray: T[] = [];
      for (const entry of entries) {
        bufferArray.push(entry);
        if (bufferArray.length === size) {
          yield bufferArray;
          bufferArray = [];
        }
      }
      if (bufferArray.length) {
        yield bufferArray;
      }
    })();
}
