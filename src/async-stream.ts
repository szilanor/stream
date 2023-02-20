/* eslint-disable @typescript-eslint/no-explicit-any */
import {AsyncCollectorFunction, ToAsyncOperationFunction} from './types';
import {createEmptyAsyncIterable} from './utils';

/** Wrapper class to extend the functionality of an Iterable */
export class AsyncStream<T> implements AsyncIterable<T> {
  protected _asyncIterable?: AsyncIterable<T>;
  protected set asyncIterable(asyncIterable: AsyncIterable<T>) {
    this._asyncIterable = asyncIterable;
  }

  protected get asyncIterable(): AsyncIterable<T> {
    this._asyncIterable = this._asyncIterable || createEmptyAsyncIterable();
    return this._asyncIterable;
  }

  /** Returns the Iterator of the wrapped Iterable */
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.asyncIterable[Symbol.asyncIterator]();
  }

  constructor(asyncIterable?: AsyncIterable<T>) {
    if (asyncIterable) {
      this.asyncIterable = asyncIterable;
    }
  }

  /** Calls a collector function on the Iterable */
  collectAsync<O>(collector: AsyncCollectorFunction<T, O>): PromiseLike<O> {
    return collector(this.asyncIterable);
  }

  /** Calls an operation function on the Iterable then returns the result as a Stream
   *  allowing to chain it with more Stream related methods. */
  pipeAsync(...ops: ToAsyncOperationFunction<any, any>[]): AsyncStream<any> {
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

declare module './async-stream' {
  export interface AsyncSteam<T> {
    pipeAsync<A>(op1: ToAsyncOperationFunction<T, A>): AsyncStream<A>;
    pipeAsync<A, B>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>
    ): AsyncStream<B>;
    pipeAsync<A, B, C>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>
    ): AsyncStream<C>;
    pipeAsync<A, B, C, D>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>,
      op4: ToAsyncOperationFunction<C, D>
    ): AsyncStream<D>;
    pipeAsync<A, B, C, D, E>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>,
      op4: ToAsyncOperationFunction<C, D>,
      op5: ToAsyncOperationFunction<D, E>
    ): AsyncStream<E>;
    pipeAsync<A, B, C, D, E, F>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>,
      op4: ToAsyncOperationFunction<C, D>,
      op5: ToAsyncOperationFunction<D, E>,
      op6: ToAsyncOperationFunction<E, F>
    ): AsyncStream<F>;
    pipeAsync<A, B, C, D, E, F, G>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>,
      op4: ToAsyncOperationFunction<C, D>,
      op5: ToAsyncOperationFunction<D, E>,
      op6: ToAsyncOperationFunction<E, F>,
      op7: ToAsyncOperationFunction<F, G>
    ): AsyncStream<G>;
    pipeAsync<A, B, C, D, E, F, G, H>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>,
      op4: ToAsyncOperationFunction<C, D>,
      op5: ToAsyncOperationFunction<D, E>,
      op6: ToAsyncOperationFunction<E, F>,
      op7: ToAsyncOperationFunction<F, G>,
      op8: ToAsyncOperationFunction<G, H>
    ): AsyncStream<H>;
    pipeAsync<A, B, C, D, E, F, G, H, I>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>,
      op4: ToAsyncOperationFunction<C, D>,
      op5: ToAsyncOperationFunction<D, E>,
      op6: ToAsyncOperationFunction<E, F>,
      op7: ToAsyncOperationFunction<F, G>,
      op8: ToAsyncOperationFunction<G, H>,
      op9: ToAsyncOperationFunction<H, I>
    ): AsyncStream<H>;
    pipeAsync<A, B, C, D, E, F, G, H, I>(
      op1: ToAsyncOperationFunction<T, A>,
      op2: ToAsyncOperationFunction<A, B>,
      op3: ToAsyncOperationFunction<B, C>,
      op4: ToAsyncOperationFunction<C, D>,
      op5: ToAsyncOperationFunction<D, E>,
      op6: ToAsyncOperationFunction<E, F>,
      op7: ToAsyncOperationFunction<F, G>,
      op8: ToAsyncOperationFunction<G, H>,
      op9: ToAsyncOperationFunction<H, I>
    ): AsyncStream<unknown>;
    pipeAsync(...ops: ToAsyncOperationFunction<T, T>[]): AsyncStream<T>;
  }
}
