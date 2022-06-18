export type CollectorFunction<TInput, TOutput> = (
  stream: Iterable<TInput>
) => TOutput;
