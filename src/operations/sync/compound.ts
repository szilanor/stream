/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationFunction } from "~/types";

/** Type-safe helper operation that concatenates multiple operations in order. */
export function compound<T>(): OperationFunction<T, T>;
export function compound<T, A>(
  op1: OperationFunction<T, A>,
): OperationFunction<T, A>;
export function compound<T, A, B>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
): OperationFunction<T, B>;
export function compound<T, A, B, C>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
): OperationFunction<T, C>;
export function compound<T, A, B, C, D>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
  op4: OperationFunction<C, D>,
): OperationFunction<T, D>;
export function compound<T, A, B, C, D, E>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
  op4: OperationFunction<C, D>,
  op5: OperationFunction<D, E>,
): OperationFunction<T, E>;
export function compound<T, A, B, C, D, E, F>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
  op4: OperationFunction<C, D>,
  op5: OperationFunction<D, E>,
  op6: OperationFunction<E, F>,
): OperationFunction<T, F>;
export function compound<T, A, B, C, D, E, F, G>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
  op4: OperationFunction<C, D>,
  op5: OperationFunction<D, E>,
  op6: OperationFunction<E, F>,
  op7: OperationFunction<F, G>,
): OperationFunction<T, G>;
export function compound<T, A, B, C, D, E, F, G, H>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
  op4: OperationFunction<C, D>,
  op5: OperationFunction<D, E>,
  op6: OperationFunction<E, F>,
  op7: OperationFunction<F, G>,
  op8: OperationFunction<G, H>,
): OperationFunction<T, H>;
export function compound<T, A, B, C, D, E, F, G, H, I>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
  op4: OperationFunction<C, D>,
  op5: OperationFunction<D, E>,
  op6: OperationFunction<E, F>,
  op7: OperationFunction<F, G>,
  op8: OperationFunction<G, H>,
  op9: OperationFunction<H, I>,
): OperationFunction<T, I>;
export function compound<T, A, B, C, D, E, F, G, H, I, J>(
  op1: OperationFunction<T, A>,
  op2: OperationFunction<A, B>,
  op3: OperationFunction<B, C>,
  op4: OperationFunction<C, D>,
  op5: OperationFunction<D, E>,
  op6: OperationFunction<E, F>,
  op7: OperationFunction<F, G>,
  op8: OperationFunction<G, H>,
  op9: OperationFunction<H, I>,
  op10: OperationFunction<I, J>,
): OperationFunction<T, J>;
export function compound(
  ...ops: OperationFunction<any, any>[]
): OperationFunction<any, any> {
  return (iterable) => ops.reduce((piped, op) => op(piped), iterable);
}

export const pipe = compound;
