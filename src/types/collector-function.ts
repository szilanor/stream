export type CollectorFunction<TInput, TOutput> = (
  stream: Iterable<TInput>
) => TOutput;

export type AsyncCollectorFunction<TInput, TOutput> = (
  stream: AsyncIterable<TInput>
) => PromiseLike<TOutput>;
