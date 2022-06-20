/* eslint-disable @typescript-eslint/no-explicit-any */
import {OperationFunction, CollectorFunction} from './types';

/** Wrapper class to extend the functionality of an Iterable */
export class Stream<T> implements Iterable<T> {
  constructor(private iterable: Iterable<T> | Generator<T>) {}

  /** Calls a collector function on the Iterable */
  collect<O>(collector: CollectorFunction<T, O>): O {
    return collector(this);
  }

  /** Returns the Iterator of the wrapped Iterable */
  [Symbol.iterator](): Iterator<T> {
    return this.iterable[Symbol.iterator]();
  }

  /** Calls an operation function on the Iterable then returns the result as a Stream
   *  allowing to chain it with more Stream related methods. */
  pipe(): Stream<T>;
  pipe<A>(op1: OperationFunction<T, A>): Stream<A>;
  pipe<A, B>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>
  ): Stream<B>;
  pipe<A, B, C>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>
  ): Stream<C>;
  pipe<A, B, C, D>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>,
    op4: OperationFunction<C, D>
  ): Stream<D>;
  pipe<A, B, C, D, E>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>,
    op4: OperationFunction<C, D>,
    op5: OperationFunction<D, E>
  ): Stream<E>;
  pipe<A, B, C, D, E, F>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>,
    op4: OperationFunction<C, D>,
    op5: OperationFunction<D, E>,
    op6: OperationFunction<E, F>
  ): Stream<F>;
  pipe<A, B, C, D, E, F, G>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>,
    op4: OperationFunction<C, D>,
    op5: OperationFunction<D, E>,
    op6: OperationFunction<E, F>,
    op7: OperationFunction<F, G>
  ): Stream<G>;
  pipe<A, B, C, D, E, F, G, H>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>,
    op4: OperationFunction<C, D>,
    op5: OperationFunction<D, E>,
    op6: OperationFunction<E, F>,
    op7: OperationFunction<F, G>,
    op8: OperationFunction<G, H>
  ): Stream<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>,
    op4: OperationFunction<C, D>,
    op5: OperationFunction<D, E>,
    op6: OperationFunction<E, F>,
    op7: OperationFunction<F, G>,
    op8: OperationFunction<G, H>,
    op9: OperationFunction<H, I>
  ): Stream<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: OperationFunction<T, A>,
    op2: OperationFunction<A, B>,
    op3: OperationFunction<B, C>,
    op4: OperationFunction<C, D>,
    op5: OperationFunction<D, E>,
    op6: OperationFunction<E, F>,
    op7: OperationFunction<F, G>,
    op8: OperationFunction<G, H>,
    op9: OperationFunction<H, I>,
    ...ops: OperationFunction<any, any>[]
  ): Stream<unknown>;
  pipe(...ops: OperationFunction<any, any>[]): Stream<any> {
    if (!ops.length) {
      return this;
    }

    let result = ops[0](this);
    for (let i = 1; i < ops.length; i++) {
      result = ops[i](result);
    }

    return new Stream<any>(result);
  }
}
