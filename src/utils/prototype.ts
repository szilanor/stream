import {CollectorFunction, OperationFunction} from '../types';
import {Stream} from '../stream';

export function operationToPrototypeFunction(
  operation: <TInput, TOutput>(
    ...args: never[]
  ) => OperationFunction<TInput, TOutput>
) {
  return function <T, O>(
    this: Stream<T>,
    ...args: Parameters<typeof operation>
  ): Stream<O> {
    return this.pipe<O>(operation<T, O>(...args));
  };
}

export function monoTypeOperationToPrototypeFunction(
  operation: <A>(...args: never[]) => OperationFunction<A, A>
) {
  return function <T>(
    this: Stream<T>,
    ...args: Parameters<typeof operation>
  ): Stream<T> {
    return this.pipe<T>(operation<T>(...args));
  };
}

export function collectorToPrototypeFunction(
  collector: <TInput, TOutput>(
    ...args: never[]
  ) => CollectorFunction<TInput, TOutput>
) {
  return function <T, O>(
    this: Stream<T>,
    ...args: Parameters<typeof collector>
  ): O {
    return this.collect<O>(collector(...args));
  };
}

export function monoTypeCollectorToPrototypeFunction(
  collector: <T>(...args: never[]) => CollectorFunction<T, T>
) {
  return function <T>(
    this: Stream<T>,
    ...args: Parameters<typeof collector>
  ): T {
    return this.collect(collector<T>(...args));
  };
}
