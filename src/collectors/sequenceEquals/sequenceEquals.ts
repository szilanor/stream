import { CollectorFunction } from "../../types";
import { EqualsFunction } from "../../utils";

export function sequenceEquals<T>(
  other: Iterable<T>,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b,
): CollectorFunction<T, boolean> {
  return (source) => {
    const sourceIterator = source[Symbol.iterator]();
    const otherIterator = other[Symbol.iterator]();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const sourceNext = sourceIterator.next();
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
