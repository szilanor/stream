export type CollectorFunction<TInput, TOutput> = (
  iterable: Iterable<TInput>
) => TOutput;

export type AsyncCollectorFunction<TInput, TOutput> = (
  iterable: AsyncIterable<TInput>
) => PromiseLike<TOutput>;

export type AnyCollectorFunction<TInput, TOutput> = (
  iterable: Iterable<TInput> | AsyncIterable<TInput>
) => PromiseLike<TOutput>;
