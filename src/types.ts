export interface AsyncStreamLike<T> extends AsyncIterable<T> {
  [Symbol.asyncIterator]: () => AsyncIterator<T>;
  collectAsync: <O>(collector: AsyncCollectorFunction<T, O>) => Promise<O>;
  pipeAsync: <O>(operation: AsyncOperationFunction<T, O>) => AsyncStreamLike<O>;
}

export interface StreamLike<T> extends AsyncStreamLike<T>, Iterable<T> {
  [Symbol.iterator]: () => Iterator<T>;
  collect: <O>(collector: CollectorFunction<T, O>) => O;
  pipe: <O>(operation: OperationFunction<T, O>) => StreamLike<O>;
}

export type OperationFunction<TInput, TOutput> = (
  iterable: Iterable<TInput>,
) => Iterable<TOutput>;

export type AsyncOperationFunction<TInput, TOutput> = (
  iterable: AsyncIterable<TInput>,
) => AsyncIterable<TOutput>;

export type CollectorFunction<TInput, TOutput> = (
  iterable: Iterable<TInput>,
) => TOutput;

export type AsyncCollectorFunction<TInput, TOutput> = (
  iterable: AsyncIterable<TInput>,
) => Promise<TOutput>;

export type EqualsFunction<T> = (a: T, b: T) => boolean;

export type CompareFunction<T> = (a: T, b: T) => number;

export type MaybeAsyncValue<T> = T | Promise<T>;

export type ReduceFunction<T, O = T> = (
  previous: O,
  current: T,
  index: number,
) => O;

export type AsyncReduceFunction<T, O = T> = (
  previous: O,
  current: T,
  index: number,
) => MaybeAsyncValue<O>;

export type ValueOrFactory<T> = T | (() => T);

export type PredicateFunction<T> = (item: T, index: number) => boolean;

export type MaybeAsyncPredicateFunction<T> = (
  item: T,
  index: number,
) => boolean | Promise<boolean>;

export type TypeGuardFunction<T, TOfType extends T> = (
  item: T,
  index: number,
) => item is TOfType;

export type CallbackFunction<T> = (item: T, index: number) => void;

export type MaybeAsyncCallbackFunction<T> = (
  item: T,
  index: number,
) => void | Promise<void>;

export type MapperFunction<T, O> = (item: T, index: number) => O;

export type AsyncMapperFunction<T, O> = (
  item: T,
  index: number,
) => Promise<O>;
