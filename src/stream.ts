import {OperationFunction, CollectorFunction} from './types';

/** Wrapper class to extend the functionality of an Iterable */
export class Stream<T> implements Iterable<T> {
  constructor(private iterable: Iterable<T> | Generator<T>) {}

  /** Calls an operation function on the Iterable then returns the result as a Stream
   *  allowing to chain it with more Stream related methods. */
  pipe<O>(operation: OperationFunction<T, O>): Stream<O> {
    return new Stream(operation(this));
  }

  /** Calls a collector function on the Iterable */
  collect<O>(collector: CollectorFunction<T, O>): O {
    return collector(this);
  }

  /** Returns the Iterator of the wrapped Iterable */
  [Symbol.iterator](): Iterator<T> {
    return this.iterable[Symbol.iterator]();
  }
}
