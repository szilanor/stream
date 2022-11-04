export type AsyncOperationFunction<TInput, TOutput> = (
  entries: AsyncIterable<TInput>
) => AsyncIterable<TOutput>;
