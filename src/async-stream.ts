/* eslint-disable @typescript-eslint/no-explicit-any */
import {AsyncCollectorFunction, AsyncOperationFunction} from './types';
import {toAsyncIterable} from './utils';

/** Wrapper class to extend the functionality of an Iterable */
export class AsyncStream<T> implements AsyncIterable<T> {
  private readonly iterable: AsyncIterable<T>;

  constructor(iterable: Iterable<T> | AsyncIterable<T>) {
    this.iterable = toAsyncIterable(iterable);
  }

  /** Calls a collector function on the Iterable */
  collect<O>(collector: AsyncCollectorFunction<T, O>): PromiseLike<O> {
    return collector(this.iterable);
  }

  /** Returns the Iterator of the wrapped Iterable */
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.iterable[Symbol.asyncIterator]();
  }

  /** Calls an operation function on the Iterable then returns the result as a Stream
   *  allowing to chain it with more Stream related methods. */
  pipe(): AsyncStream<T>;
  pipe<A>(op1: AsyncOperationFunction<T, A>): AsyncStream<A>;
  pipe<A, B>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>
  ): AsyncStream<B>;
  pipe<A, B, C>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>
  ): AsyncStream<C>;
  pipe<A, B, C, D>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>
  ): AsyncStream<D>;
  pipe<A, B, C, D, E>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>
  ): AsyncStream<E>;
  pipe<A, B, C, D, E, F>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>
  ): AsyncStream<F>;
  pipe<A, B, C, D, E, F, G>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>,
    op7: AsyncOperationFunction<F, G>
  ): AsyncStream<G>;
  pipe<A, B, C, D, E, F, G, H>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>,
    op7: AsyncOperationFunction<F, G>,
    op8: AsyncOperationFunction<G, H>
  ): AsyncStream<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>,
    op7: AsyncOperationFunction<F, G>,
    op8: AsyncOperationFunction<G, H>,
    op9: AsyncOperationFunction<H, I>
  ): AsyncStream<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>,
    op7: AsyncOperationFunction<F, G>,
    op8: AsyncOperationFunction<G, H>,
    op9: AsyncOperationFunction<H, I>
  ): AsyncStream<unknown>;
  pipe(...ops: AsyncOperationFunction<any, any>[]): AsyncStream<any> {
    if (!ops.length) {
      return this;
    }

    let result: AsyncIterable<any> = ops[0](this.iterable);
    for (let i = 1; i < ops.length; i++) {
      result = ops[i](result);
    }

    return new AsyncStream<any>(result);
  }
}
