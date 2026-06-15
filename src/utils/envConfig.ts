export type EnvKey = 'local' | 'staging' | 'production'

export const API_ENV_STORAGE_KEY = 'api_env'

export const envMap: Record<EnvKey, string> = {
  local: import.meta.env.VITE_BASE_URL,
  staging: import.meta.env.VITE_API_URL_STAGING,
  production: import.meta.env.VITE_API_URL_PRODUCTION,
}

export type EnvOption = {
  key: EnvKey
  label: string
  dot: string
  badgeClassName: string
  dotClassName: string
}

export const ENV_OPTIONS: EnvOption[] = [
  {
    key: 'production',
    label: 'Production',
    dot: '🟢',
    badgeClassName: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    dotClassName: 'bg-emerald-500',
  },
  {
    key: 'staging',
    label: 'Staging',
    dot: '🟡',
    badgeClassName: 'border-amber-200 bg-amber-50 text-amber-800',
    dotClassName: 'bg-amber-400',
  },
  {
    key: 'local',
    label: 'Local',
    dot: '⚫',
    badgeClassName: 'border-zinc-200 bg-zinc-100 text-zinc-700',
    dotClassName: 'bg-zinc-500',
  },
]

const ENV_CHANGE_EVENT = 'api-env-changed'

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, '')
}

function resolveEnvFromUrl(url: string): EnvKey | null {
  const normalized = normalizeUrl(url)
  for (const [key, value] of Object.entries(envMap) as [EnvKey, string][]) {
    if (normalizeUrl(value) === normalized) {
      return key
    }
  }
  return null
}

export function isEnvKey(value: string): value is EnvKey {
  return value in envMap
}

export function getSavedEnvKey(): EnvKey | null {
  const saved = localStorage.getItem(API_ENV_STORAGE_KEY)
  return saved && isEnvKey(saved) ? saved : null
}

export function getCurrentEnvKey(): EnvKey {
  const saved = getSavedEnvKey()
  if (saved) {
    return saved
  }

  const fromBuild = resolveEnvFromUrl(import.meta.env.VITE_BASE_URL ?? '')
  return fromBuild ?? 'local'
}

export function getBaseUrl(): string {
  const saved = getSavedEnvKey()
  return saved ? envMap[saved] : (import.meta.env.VITE_BASE_URL ?? envMap.local)
}

export function getEnvOption(key: EnvKey): EnvOption {
  return ENV_OPTIONS.find((option) => option.key === key) ?? ENV_OPTIONS[2]
}

export function setApiEnv(key: EnvKey): void {
  localStorage.setItem(API_ENV_STORAGE_KEY, key)
  window.dispatchEvent(new Event(ENV_CHANGE_EVENT))
}

export function subscribeToApiEnv(callback: () => void): () => void {
  window.addEventListener(ENV_CHANGE_EVENT, callback)
  return () => window.removeEventListener(ENV_CHANGE_EVENT, callback)
}
