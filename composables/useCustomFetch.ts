import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export function useCustomFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  const token = useCookie('token')
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseURL,

    key: url,

    headers: token.value
      ? { Authorization: `${token.value}` }
      : {},
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}