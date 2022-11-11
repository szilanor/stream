/* eslint-disable @typescript-eslint/no-explicit-any */
import {AsyncCollectorFunction, AsyncOperationFunction} from './types';
import {createEmptyAsyncIterable, toAsyncIterable} from './utils';

/** Wrapper class to extend the functionality of an Iterable */
export class AsyncStream<T> implements AsyncIterable<T> {
  private _asyncIterable: AsyncIterable<T> | undefined;

  private set asyncIterable(iterable: AsyncIterable<T>) {
    this._asyncIterable = toAsyncIterable(iterable);
  }

  private get asyncIterable(): AsyncIterable<T> {
    if (!this._asyncIterable) {
      this._asyncIterable = createEmptyAsyncIterable();
    }
    return this._asyncIterable;
  }

  constructor(iterable?: Iterable<T> | AsyncIterable<T>) {
    if (iterable) {
      this.asyncIterable = toAsyncIterable(iterable);
    }
  }

  /** Calls a collector function on the Iterable */
  collectAsync<O>(collector: AsyncCollectorFunction<T, O>): PromiseLike<O> {
    return collector(this.asyncIterable);
  }

  /** Returns the Iterator of the wrapped Iterable */
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.asyncIterable[Symbol.asyncIterator]();
  }

  /** Calls an operation function on the Iterable then returns the result as a Stream
   *  allowing to chain it with more Stream related methods. */
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
  ): AsyncStream<unknown>;
  pipeAsync(...ops: AsyncOperationFunction<T, T>[]): AsyncStream<T>;
  pipeAsync(...ops: AsyncOperationFunction<any, any>[]): AsyncStream<any> {
    if (!ops.length) {
      return this;
    }

    let result: AsyncIterable<any> = ops[0](this.asyncIterable);
    for (let i = 1; i < ops.length; i++) {
      result = ops[i](result);
    }

    return new AsyncStream<any>(result);
  }
}
