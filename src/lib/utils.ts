import type { ApiResponse } from '@/lib/services/type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSuccessMessage = (data: ApiResponse<unknown>) => {
  return data.message
}
