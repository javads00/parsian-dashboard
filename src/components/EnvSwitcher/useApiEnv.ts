import {
  getCurrentEnvKey,
  getEnvOption,
  subscribeToApiEnv,
  type EnvKey,
  type EnvOption,
} from '@/utils/envConfig'
import { useSyncExternalStore } from 'react'

type UseApiEnvResult = {
  envKey: EnvKey
  envOption: EnvOption
}

export function useApiEnv(): UseApiEnvResult {
  const envKey = useSyncExternalStore(subscribeToApiEnv, getCurrentEnvKey, getCurrentEnvKey)

  return {
    envKey,
    envOption: getEnvOption(envKey),
  }
}
