export function isNotNull<T>(
  value: T | null | undefined,
): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isFunction(x: unknown): x is (...args: unknown[]) => unknown {
  return typeof x === "function";
}

export function isIterable<T>(x: unknown): x is Iterable<T> {
  return (
    x !== null &&
    x !== undefined &&
    typeof x === "object" &&
    Symbol.iterator in x &&
    isFunction(x[Symbol.iterator as keyof typeof x])
  );
}

export function isNotNullOrEmpty<T extends { length: number }>(
  value: T | null | undefined,
): value is NonNullable<T> {
  return !!value && value.length > 0;
}

export function isNotNullOrWhitespace(
  value: string | null | undefined,
): value is NonNullable<string> {
  return !!value && value.trim().length > 0;
}
