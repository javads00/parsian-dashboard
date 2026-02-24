import { apiClient, endpoints, request } from '@/lib'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthStore, AuthorizedUser } from '../types'

const authStore = create<AuthStore>()(
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

export const getAuthStore = () => authStore
export const useAuthStore = authStore
