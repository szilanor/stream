/* eslint-disable @typescript-eslint/no-explicit-any */
export function isNotNull<T>(
  value: T | null | undefined
): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isFunction(x: unknown): x is Function {
  return typeof x === 'function';
}

export function isIterable<T>(
  x: Iterable<T> | AsyncIterable<T>
): x is Iterable<T> {
  return (
    x !== null && x !== undefined && isFunction((x as any)[Symbol.iterator])
  );
}

export function isNotNullOrEmpty<T extends {length: number}>(
  value: T | null | undefined
): value is NonNullable<T> {
  return !!value && value.length > 0;
}

export function isNotNullOrWhitespace(
  value: string | null | undefined
): value is NonNullable<string> {
  return !!value && value.trim().length > 0;
}
