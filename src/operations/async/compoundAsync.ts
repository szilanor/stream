/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncOperationFunction } from "~/types";

/** Type-safe helper operation that concatenates multiple operations in order. */
export function compoundAsync<T>(): AsyncOperationFunction<T, T>;
export function compoundAsync<T, A>(
  op1: AsyncOperationFunction<T, A>,
): AsyncOperationFunction<T, A>;
export function compoundAsync<T, A, B>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
): AsyncOperationFunction<T, B>;
export function compoundAsync<T, A, B, C>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
): AsyncOperationFunction<T, C>;
export function compoundAsync<T, A, B, C, D>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
  op4: AsyncOperationFunction<C, D>,
): AsyncOperationFunction<T, D>;
export function compoundAsync<T, A, B, C, D, E>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
  op4: AsyncOperationFunction<C, D>,
  op5: AsyncOperationFunction<D, E>,
): AsyncOperationFunction<T, E>;
export function compoundAsync<T, A, B, C, D, E, F>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
  op4: AsyncOperationFunction<C, D>,
  op5: AsyncOperationFunction<D, E>,
  op6: AsyncOperationFunction<E, F>,
): AsyncOperationFunction<T, F>;
export function compoundAsync<T, A, B, C, D, E, F, G>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
  op4: AsyncOperationFunction<C, D>,
  op5: AsyncOperationFunction<D, E>,
  op6: AsyncOperationFunction<E, F>,
  op7: AsyncOperationFunction<F, G>,
): AsyncOperationFunction<T, G>;
export function compoundAsync<T, A, B, C, D, E, F, G, H>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
  op4: AsyncOperationFunction<C, D>,
  op5: AsyncOperationFunction<D, E>,
  op6: AsyncOperationFunction<E, F>,
  op7: AsyncOperationFunction<F, G>,
  op8: AsyncOperationFunction<G, H>,
): AsyncOperationFunction<T, H>;
export function compoundAsync<T, A, B, C, D, E, F, G, H, I>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
  op4: AsyncOperationFunction<C, D>,
  op5: AsyncOperationFunction<D, E>,
  op6: AsyncOperationFunction<E, F>,
  op7: AsyncOperationFunction<F, G>,
  op8: AsyncOperationFunction<G, H>,
  op9: AsyncOperationFunction<H, I>,
): AsyncOperationFunction<T, I>;
export function compoundAsync<T, A, B, C, D, E, F, G, H, I, J>(
  op1: AsyncOperationFunction<T, A>,
  op2: AsyncOperationFunction<A, B>,
  op3: AsyncOperationFunction<B, C>,
  op4: AsyncOperationFunction<C, D>,
  op5: AsyncOperationFunction<D, E>,
  op6: AsyncOperationFunction<E, F>,
  op7: AsyncOperationFunction<F, G>,
  op8: AsyncOperationFunction<G, H>,
  op9: AsyncOperationFunction<H, I>,
  op10: AsyncOperationFunction<I, J>,
): AsyncOperationFunction<T, unknown>;
export function compoundAsync(
  ...ops: AsyncOperationFunction<any, any>[]
): AsyncOperationFunction<any, any> {
  return (iterable) => ops.reduce((piped, op) => op(piped), iterable);
}

export const pipeAsync = compoundAsync;
