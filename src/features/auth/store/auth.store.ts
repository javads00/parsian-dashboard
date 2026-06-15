import { registerAuthHandlers } from '@/lib/services/auth-context'
import { apiClient } from '@/lib/services/api'
import { endpoints } from '@/lib/services/endpoints'
import { request } from '@/lib/services/request'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthorizedUser, TAuthStore } from '@/typescript'

const authStore = create<TAuthStore>()(
  persist(
    (set) => ({
      user: null,
      authorized: false,
      isSigningOut: false,

      signIn: async (data) => {
        const res = await request<AuthorizedUser, { username: string; password: string }>(
          apiClient,
          'post',
          endpoints.auth.login(),
          {
            username: data.username,
            password: data.password,
          }
        )

        if (res.data) {
          set({ user: res.data, authorized: true })
        }
        return res
      },

      signOut: async () => {
        set({ isSigningOut: true })
        try {
          set({ user: null, authorized: false })
        } catch {
          set({ isSigningOut: false })
        } finally {
          set({ isSigningOut: false })
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        authorized: state.authorized,
      }),
    }
  )
)

registerAuthHandlers({
  getAccessToken: () => authStore.getState().user?.accessToken,
  signOut: () => authStore.getState().signOut(),
})

export const getAuthStore = () => authStore
export const useAuthStore = authStore
