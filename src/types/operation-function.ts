export type OperationFunction<TInput, TOutput> = (
  entries: Iterable<TInput>
) => Generator<TOutput, void, void>;
