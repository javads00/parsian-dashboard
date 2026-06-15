import { cn } from '@/lib/utils'
import type { EnvKey } from '@/utils/envConfig'
import { ChevronDown } from 'lucide-react'
import { getEnvLabel, getEnvStyle } from './envStyles'

type EnvDotProps = {
  envKey: EnvKey
  size?: 'sm' | 'md'
}

export function EnvDot({ envKey, size = 'sm' }: EnvDotProps) {
  const style = getEnvStyle(envKey)
  const dotSize = size === 'sm' ? 'size-2' : 'size-2.5'
  const pingSize = size === 'sm' ? 'size-2.5' : 'size-3'

  return (
    <span aria-hidden className="relative flex shrink-0 items-center justify-center">
      {style.pulse && (
        <span
          className={cn('absolute rounded-full opacity-50', pingSize, style.dot, 'animate-ping')}
        />
      )}
      <span
        className={cn(
          'relative rounded-full',
          dotSize,
          style.dot,
          style.pulse && 'animate-pulse'
        )}
      />
    </span>
  )
}

type EnvBadgeProps = {
  envKey: EnvKey
  isOpen?: boolean
  variant?: 'default' | 'login'
  showApiPrefix?: boolean
  className?: string
}

export function EnvBadge({
  envKey,
  isOpen = false,
  variant = 'default',
  showApiPrefix = false,
  className,
}: EnvBadgeProps) {
  const style = getEnvStyle(envKey)
  const label = getEnvLabel(envKey)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border font-medium shadow-sm transition-all duration-150',
        style.border,
        style.bg,
        style.text,
        style.bgHover,
        'hover:shadow-md',
        variant === 'login' ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-1.5 text-sm',
        className
      )}
    >
      <EnvDot envKey={envKey} size={variant === 'login' ? 'sm' : 'md'} />
      <span className="font-medium">{showApiPrefix ? `API: ${label}` : label}</span>
      <ChevronDown
        className={cn(
          'size-3.5 shrink-0 opacity-60 transition-transform duration-150 ease-out',
          isOpen && 'rotate-180'
        )}
      />
    </span>
  )
}
