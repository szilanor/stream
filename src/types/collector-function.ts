export type CollectorFunction<TInput, TOutput> = (
  iterable: Iterable<TInput>
) => TOutput;

export type AsyncCollectorFunction<TInput, TOutput> = (
  iterable: AsyncIterable<TInput>
) => PromiseLike<TOutput>;
