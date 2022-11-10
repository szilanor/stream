export function isNotNullOrWhitespace(
  value: string | null | undefined
): value is NonNullable<string> {
  return !!value && value.trim().length > 0;
}
