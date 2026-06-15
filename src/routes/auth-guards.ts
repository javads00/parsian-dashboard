import { getAuthStore } from '@/features'
import { redirect } from '@tanstack/react-router'

export function redirectToDashboard() {
  throw redirect({ to: '/dashboard' })
}

export function redirectToLogin() {
  throw redirect({ to: '/login', replace: true })
}

export function requireGuest() {
  const { user } = getAuthStore()?.getState() ?? {}
  if (user) {
    redirectToDashboard()
  }
}

export function requireAuth() {
  const { user } = getAuthStore().getState()
  if (!user) {
    redirectToLogin()
  }
}
