import { getAuthStore } from '@/features'
import ky from 'ky'


const prefixUrl = import.meta.env.DEV
  ? ''
  : import.meta.env.VITE_BASE_URL




export const apiClient = ky.create({
  prefixUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const { user } = getAuthStore()?.getState() ?? {}
        if (user?.accessToken) {
          request.headers.set('Authorization', `Bearer ${user.accessToken}`)
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          getAuthStore()?.getState().signOut?.()
          window.location.href = '/login'
        }
        return response
      },
    ],
  },
})
