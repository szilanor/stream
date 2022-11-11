/* eslint-disable @typescript-eslint/no-explicit-any */
import {AnyToAsyncOperationFunction, AsyncOperationFunction} from '../../types';

/** Type-safe helper operation that concatenates multiple operations in order. */
export function compoundAsync<T>(): AsyncOperationFunction<T, T>;
export function compoundAsync<T, A>(
  op1: AnyToAsyncOperationFunction<T, A>
): AsyncOperationFunction<T, A>;
export function compoundAsync<T, A, B>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>
): AsyncOperationFunction<T, B>;
export function compoundAsync<T, A, B, C>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>
): AsyncOperationFunction<T, C>;
export function compoundAsync<T, A, B, C, D>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>,
  op4: AnyToAsyncOperationFunction<C, D>
): AsyncOperationFunction<T, D>;
export function compoundAsync<T, A, B, C, D, E>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>,
  op4: AnyToAsyncOperationFunction<C, D>,
  op5: AnyToAsyncOperationFunction<D, E>
): AsyncOperationFunction<T, E>;
export function compoundAsync<T, A, B, C, D, E, F>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>,
  op4: AnyToAsyncOperationFunction<C, D>,
  op5: AnyToAsyncOperationFunction<D, E>,
  op6: AnyToAsyncOperationFunction<E, F>
): AsyncOperationFunction<T, F>;
export function compoundAsync<T, A, B, C, D, E, F, G>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>,
  op4: AnyToAsyncOperationFunction<C, D>,
  op5: AnyToAsyncOperationFunction<D, E>,
  op6: AnyToAsyncOperationFunction<E, F>,
  op7: AnyToAsyncOperationFunction<F, G>
): AsyncOperationFunction<T, G>;
export function compoundAsync<T, A, B, C, D, E, F, G, H>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>,
  op4: AnyToAsyncOperationFunction<C, D>,
  op5: AnyToAsyncOperationFunction<D, E>,
  op6: AnyToAsyncOperationFunction<E, F>,
  op7: AnyToAsyncOperationFunction<F, G>,
  op8: AnyToAsyncOperationFunction<G, H>
): AsyncOperationFunction<T, H>;
export function compoundAsync<T, A, B, C, D, E, F, G, H, I>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>,
  op4: AnyToAsyncOperationFunction<C, D>,
  op5: AnyToAsyncOperationFunction<D, E>,
  op6: AnyToAsyncOperationFunction<E, F>,
  op7: AnyToAsyncOperationFunction<F, G>,
  op8: AnyToAsyncOperationFunction<G, H>,
  op9: AnyToAsyncOperationFunction<H, I>
): AsyncOperationFunction<T, I>;
export function compoundAsync<T, A, B, C, D, E, F, G, H, I, J>(
  op1: AnyToAsyncOperationFunction<T, A>,
  op2: AnyToAsyncOperationFunction<A, B>,
  op3: AnyToAsyncOperationFunction<B, C>,
  op4: AnyToAsyncOperationFunction<C, D>,
  op5: AnyToAsyncOperationFunction<D, E>,
  op6: AnyToAsyncOperationFunction<E, F>,
  op7: AnyToAsyncOperationFunction<F, G>,
  op8: AnyToAsyncOperationFunction<G, H>,
  op9: AnyToAsyncOperationFunction<H, I>,
  op10: AnyToAsyncOperationFunction<I, J>
): AsyncOperationFunction<T, unknown>;
export function compoundAsync(
  ...ops: AnyToAsyncOperationFunction<any, any>[]
): AsyncOperationFunction<any, any> {
  return iterable => ops.reduce((piped, op) => op(piped), iterable);
}
