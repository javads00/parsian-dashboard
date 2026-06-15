import type { UseApiEnvResult } from '@/typescript/types/components'
import { getCurrentEnvKey, getEnvOption, subscribeToApiEnv } from '@/utils/envConfig'
import { useSyncExternalStore } from 'react'

export function useApiEnv(): UseApiEnvResult {
  const envKey = useSyncExternalStore(subscribeToApiEnv, getCurrentEnvKey, getCurrentEnvKey)

  return {
    envKey,
    envOption: getEnvOption(envKey),
  }
}
