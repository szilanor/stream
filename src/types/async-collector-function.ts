export type AsyncCollectorFunction<TInput, TOutput> = (
  stream: AsyncIterable<TInput>
) => PromiseLike<TOutput>;
