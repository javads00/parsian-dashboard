import type { EnvKey, EnvOption } from '@/utils/envConfig'

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

export type EnvDotProps = {
  envKey: EnvKey
  size?: 'sm' | 'md'
}

export type EnvBadgeProps = {
  envKey: EnvKey
  isOpen?: boolean
  variant?: 'default' | 'login'
  showApiPrefix?: boolean
  className?: string
}

export type EnvSwitcherProps = {
  requireConfirmation?: boolean
  variant?: 'default' | 'login'
  className?: string
}

export type EnvSwitcherModalProps = {
  open: boolean
  targetEnv: EnvKey | null
  onCancel: () => void
  onConfirm: () => void
}

export type UseApiEnvResult = {
  envKey: EnvKey
  envOption: EnvOption
}
