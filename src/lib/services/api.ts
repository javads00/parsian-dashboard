import { getBaseUrl } from '@/utils/envConfig'
import { authSignOut, getAccessToken } from './auth-context'
import ky, { type Input, type KyInstance, type Options } from 'ky'

function withDynamicPrefix(options?: Options): Options {
  return {
    ...options,
    prefixUrl: getBaseUrl(),
  }
}

const internalClient = ky.create({
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = getAccessToken()
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          void authSignOut()
          window.location.href = '/login'
        }

        return response
      },
    ],
  },
})

function createApiMethod<M extends 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head'>(
  method: M
) {
  return ((url: Input, options?: Options) =>
    internalClient[method](url, withDynamicPrefix(options))) as KyInstance[M]
}

export const apiClient: KyInstance = Object.assign(
  (url: Input, options?: Options) => internalClient(url, withDynamicPrefix(options)),
  {
    get: createApiMethod('get'),
    post: createApiMethod('post'),
    put: createApiMethod('put'),
    patch: createApiMethod('patch'),
    delete: createApiMethod('delete'),
    head: createApiMethod('head'),
    create: internalClient.create.bind(internalClient),
    extend: internalClient.extend.bind(internalClient),
    stop: internalClient.stop,
    retry: internalClient.retry,
  }
) as KyInstance
