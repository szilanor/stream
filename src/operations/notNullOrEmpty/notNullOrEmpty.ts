import {AsyncOperationFunction, OperationFunction} from '../../types';
import {OfTypeAsyncIterator, OfTypeIterator} from '../ofType/ofType';

export function isNotNullOrEmpty<T extends {length: number}>(
  value: T | null | undefined
): value is NonNullable<T> {
  return !!value && value.length > 0;
}

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmpty<T extends {length: number}>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return entries =>
    new OfTypeIterator(entries[Symbol.iterator](), isNotNullOrEmpty);
}

export function notNullOrEmptyAsync<
  T extends {length: number}
>(): AsyncOperationFunction<T | undefined | null, NonNullable<T>> {
  return entries =>
    new OfTypeAsyncIterator(entries[Symbol.asyncIterator](), isNotNullOrEmpty);
}
