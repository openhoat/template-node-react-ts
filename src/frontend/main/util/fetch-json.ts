import { getBaseUrl } from './helper'

export const fetchJson = async <T = unknown>(
  uriPath: string,
  options: RequestInit,
): Promise<T> => {
  const url = `${getBaseUrl()}${uriPath}`
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return (response.status === 204 ? undefined : await response.json()) as T
}
