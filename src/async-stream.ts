/* eslint-disable @typescript-eslint/no-explicit-any */
import {AsyncCollectorFunction, AsyncOperationFunction} from './types';
import {EMPTY} from './utils';

/** Wrapper class to extend the functionality of an Iterable */
export class AsyncStream<T> implements AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.asyncIterable[Symbol.asyncIterator]();
  }

  constructor(private readonly asyncIterable: AsyncIterable<T> = EMPTY) {}

  /** Calls a collector function on the Iterable */
  collectAsync<O>(collector: AsyncCollectorFunction<T, O>): PromiseLike<O> {
    return collector(this);
  }

  /** Calls an operation function on the Iterable then returns the result as a Stream
   *  allowing to chain it with more Stream related methods. */
  pipeAsync(): AsyncStream<T>;
  pipeAsync<A>(op1: AsyncOperationFunction<T, A>): AsyncStream<A>;
  pipeAsync<A, B>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>
  ): AsyncStream<B>;
  pipeAsync<A, B, C>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>
  ): AsyncStream<C>;
  pipeAsync<A, B, C, D>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>
  ): AsyncStream<D>;
  pipeAsync<A, B, C, D, E>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>
  ): AsyncStream<E>;
  pipeAsync<A, B, C, D, E, F>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>
  ): AsyncStream<F>;
  pipeAsync<A, B, C, D, E, F, G>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>,
    op7: AsyncOperationFunction<F, G>
  ): AsyncStream<G>;
  pipeAsync<A, B, C, D, E, F, G, H>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>,
    op7: AsyncOperationFunction<F, G>,
    op8: AsyncOperationFunction<G, H>
  ): AsyncStream<H>;
  pipeAsync<A, B, C, D, E, F, G, H, I>(
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
  pipeAsync<A, B, C, D, E, F, G, H, I>(
    op1: AsyncOperationFunction<T, A>,
    op2: AsyncOperationFunction<A, B>,
    op3: AsyncOperationFunction<B, C>,
    op4: AsyncOperationFunction<C, D>,
    op5: AsyncOperationFunction<D, E>,
    op6: AsyncOperationFunction<E, F>,
    op7: AsyncOperationFunction<F, G>,
    op8: AsyncOperationFunction<G, H>,
    op9: AsyncOperationFunction<H, I>
  ): AsyncStream<I>;
  pipeAsync(...ops: AsyncOperationFunction<T, T>[]): AsyncStream<T>;
  pipeAsync(...ops: AsyncOperationFunction<any, any>[]): AsyncStream<any> {
    if (!ops.length) {
      return this;
    }

    let result: AsyncIterable<any> = ops[0](this);
    for (let i = 1; i < ops.length; i++) {
      result = ops[i](result);
    }

    return new AsyncStream<any>(result);
  }
}
