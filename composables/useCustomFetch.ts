import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export function useCustomFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  const token = useCookie('token')
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseURL,

    key: url,

    // set user token if connected
    headers: token.value
      ? { Authorization: `${token.value}` }
      : {},
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}