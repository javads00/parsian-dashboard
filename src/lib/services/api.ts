import { authSignOut, getAccessToken } from './auth-context'
import ky from 'ky'

const prefixUrl = (import.meta.env.VITE_BASE_URL ?? 'http://localhost:3500').replace(/\/?$/, '/')
console.log('prefixUrl', prefixUrl)
export const apiClient = ky.create({
  prefixUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (request) => {
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
