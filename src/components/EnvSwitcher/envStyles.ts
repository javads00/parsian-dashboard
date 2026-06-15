import { envMap, getEnvOption, type EnvKey } from '@/utils/envConfig'

export type EnvStyle = {
  dot: string
  pulse: boolean
  border: string
  bg: string
  bgHover: string
  text: string
  button: string
  buttonHover: string
  rowHover: string
  rowActive: string
  check: string
  iconBg: string
}

export const ENV_STYLES: Record<EnvKey, EnvStyle> = {
  production: {
    dot: 'bg-green-500',
    pulse: true,
    border: 'border-green-200/80',
    bg: 'bg-green-50/90',
    bgHover: 'hover:bg-green-100/90',
    text: 'text-green-700',
    button: 'bg-green-600',
    buttonHover: 'hover:bg-green-700',
    rowHover: 'hover:bg-green-50',
    rowActive: 'bg-green-50/80',
    check: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  staging: {
    dot: 'bg-yellow-400',
    pulse: true,
    border: 'border-yellow-200/80',
    bg: 'bg-yellow-50/90',
    bgHover: 'hover:bg-yellow-100/90',
    text: 'text-yellow-700',
    button: 'bg-yellow-500',
    buttonHover: 'hover:bg-yellow-600',
    rowHover: 'hover:bg-yellow-50',
    rowActive: 'bg-yellow-50/80',
    check: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
  },
  local: {
    dot: 'bg-gray-400',
    pulse: false,
    border: 'border-gray-200/80',
    bg: 'bg-gray-50/90',
    bgHover: 'hover:bg-gray-100/90',
    text: 'text-gray-600',
    button: 'bg-gray-500',
    buttonHover: 'hover:bg-gray-600',
    rowHover: 'hover:bg-gray-50',
    rowActive: 'bg-gray-50/80',
    check: 'text-gray-500',
    iconBg: 'bg-gray-100',
  },
}

export function getEnvStyle(key: EnvKey): EnvStyle {
  return ENV_STYLES[key]
}

export function formatDisplayUrl(key: EnvKey): string {
  const url = envMap[key]

  try {
    const { host, pathname } = new URL(url)
    const path = pathname === '/' ? '' : pathname
    return `${host}${path}`
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
}

export function getEnvLabel(key: EnvKey): string {
  return getEnvOption(key).label
}
