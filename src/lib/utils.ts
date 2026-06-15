import type { ApiEnvelope, ApiResponse } from '@/lib/services/type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSuccessMessage = (data: ApiResponse<unknown>) => {
  return data.message
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  if (error != null && typeof error === 'object' && 'message' in error) {
    const m = (error as { message?: unknown }).message
    if (typeof m === 'string') return m
  }
  try {
    return JSON.stringify(error)
  } catch {
    return 'Something went wrong'
  }
}

export async function parseEnvelope<T>(response: Response): Promise<ApiEnvelope<T>> {
  const empty = { data: undefined as T }

  if (response.status === 204 || response.status === 205) return empty
  if (response.headers.get('Content-Length') === '0') return empty

  const text = await response.text()
  if (!text) return empty

  try {
    return JSON.parse(text) as ApiEnvelope<T>
  } catch {
    return empty
  }
}
