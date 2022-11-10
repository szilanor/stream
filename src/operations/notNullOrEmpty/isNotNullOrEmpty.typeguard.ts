export function isNotNullOrEmpty<T extends {length: number}>(
  value: T | null | undefined
): value is NonNullable<T> {
  return !!value && value.length > 0;
}
