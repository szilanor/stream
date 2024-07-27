export type OperationFunction<TInput, TOutput> = (
  iterable: Iterable<TInput>,
) => Iterable<TOutput>;

export type AsyncOperationFunction<TInput, TOutput> = (
  iterable: AsyncIterable<TInput>,
) => AsyncIterable<TOutput>;
