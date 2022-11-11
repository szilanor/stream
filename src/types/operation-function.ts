export type OperationFunction<TInput, TOutput> = (
  entries: Iterable<TInput>
) => Iterable<TOutput>;

export type AsyncOperationFunction<TInput, TOutput> = (
  entries: AsyncIterable<TInput>
) => AsyncIterable<TOutput>;

export type AnyToAsyncOperationFunction<TInput, TOutput> = (
  entries: AsyncIterable<TInput> | Iterable<TInput>
) => AsyncIterable<TOutput>;

export type ToAsyncOperationFunction<TInput, TOutput> =
  | AnyToAsyncOperationFunction<TInput, TOutput>
  | AsyncOperationFunction<TInput, TOutput>;
