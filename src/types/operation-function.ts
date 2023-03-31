export type OperationFunction<TInput, TOutput> = (
  entries: Iterable<TInput>
) => Iterable<TOutput>;

export type AsyncOperationFunction<TInput, TOutput> = (
  entries: AsyncIterable<TInput>
) => AsyncIterable<TOutput>;
