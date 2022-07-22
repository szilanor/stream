export type OperationFunction<TInput, TOutput> = (
  entries: Iterable<TInput>
) => Iterable<TOutput>;
