export function buildQueryString(query: Record<string, any>): string {
  return Object.entries(query)
    .map(([key, value]) =>
      key && value ? `${key}=${encodeURIComponent(value)}` : '',
    )
    .join('&')
}
