export function toAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T> {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      return {
        async next(): Promise<IteratorResult<T>> {
          const {value, done} = iterator.next();
          return done
            ? {done, value: undefined as unknown}
            : {done, value: value};
        },
      };
    },
  };
}
