export type EqualsFunction<T> = (a: T, b: T) => boolean;
export type CompareFunction<T> = (a: T, b: T) => number;
export type MaybeAsyncFunction<T> = () => T | PromiseLike<T>;
export type MaybeAsyncValue<T> = T | PromiseLike<T>;
export type ReduceFunction<T, O = T> = (
  previous: O,
  current: T,
  index: number
) => O;
export type AsyncReduceFunction<T, O = T> = (
  previous: O,
  current: T,
  index: number
) => MaybeAsyncValue<O>;
export type ValueOrFactory<T> = T | (() => T);
export type PredicateFunction<T> = (item: T, index: number) => boolean;
export type MaybeAsyncPredicateFunction<T> = (
  item: T,
  index: number
) => boolean | Promise<boolean>;
export type TypeGuardFunction<T, TOfType extends T> = (
  item: T,
  index: number
) => item is TOfType;
export type CallbackFunction<T> = (item: T, index: number) => void;
export type MapperFunction<T, O> = (item: T, index: number) => O;
export type AsyncMapperFunction<T, O> = (
  item: T,
  index: number
) => PromiseLike<O>;
