import {AsyncCollectorFunction} from '../../types';
import {EqualsFunction} from '../../utils';

export function sequenceEqualsAsync<T>(
  other: Iterable<T>,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b
): AsyncCollectorFunction<T, boolean> {
  return async source => {
    const sourceIterator = source[Symbol.asyncIterator]();
    const otherIterator = other[Symbol.iterator]();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const sourceNext = await sourceIterator.next();
      const otherNext = otherIterator.next();
      if (otherNext.done) {
        return true;
      }
      if (
        sourceNext.done ||
        !equalsFunction(sourceNext.value, otherNext.value)
      ) {
        return false;
      }
    }
  };
}
