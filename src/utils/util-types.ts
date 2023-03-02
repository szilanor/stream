export type EqualsFunction<T> = (a: T, b: T) => boolean;
export type CompareFunction<T> = (a: T, b: T) => number;
export type ReduceFunction<T, O = T> = (
  previous: O,
  current: T,
  index: number
) => O;

export type AsyncReduceFunction<T, O = T> = (
  previous: O,
  current: T,
  index: number
) => O | PromiseLike<O>;

export type PredicateFunction<T> = (item: T, index?: number) => boolean;
export type TypeGuardFunction<T, TOfType extends T> = (
  item: T,
  index?: number
) => item is TOfType;

export type CallbackFunction<T> = (item: T, index: number) => void;
export type MapperFunction<T, O> = (item: T, index: number) => O;
export type AsyncMapperFunction<T, O> = (
  item: T,
  index: number
) => PromiseLike<O>;
