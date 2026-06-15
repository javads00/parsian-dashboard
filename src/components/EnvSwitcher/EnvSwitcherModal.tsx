import { cn } from '@/lib/utils'
import type { EnvSwitcherModalProps } from '@/typescript/types/components'
import { AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatDisplayUrl, getEnvLabel, getEnvStyle } from './envStyles'

export function EnvSwitcherModal({
  open,
  targetEnv,
  onCancel,
  onConfirm,
}: EnvSwitcherModalProps) {
  const [shouldRender, setShouldRender] = useState(open)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      const frame = requestAnimationFrame(() => setIsVisible(true))
      document.body.style.overflow = 'hidden'

      return () => cancelAnimationFrame(frame)
    }

    setIsVisible(false)
    document.body.style.overflow = ''

    const timer = window.setTimeout(() => setShouldRender(false), 200)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel])

  if (!shouldRender || !targetEnv) {
    return null
  }

  const style = getEnvStyle(targetEnv)
  const label = getEnvLabel(targetEnv)
  const displayUrl = formatDisplayUrl(targetEnv)

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className={cn(
          'absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="env-switch-title"
        className={cn(
          'relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-md transition-all duration-200 ease-out',
          isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        )}
      >
        <div
          className={cn(
            'mx-auto mb-4 flex size-14 items-center justify-center rounded-full',
            style.iconBg
          )}
        >
          <AlertTriangle className={cn('size-7', style.check)} strokeWidth={2} />
        </div>

        <div className="space-y-2 text-center">
          <h2 id="env-switch-title" className="text-lg font-bold tracking-tight text-gray-900">
            Switch to {label}?
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            You will be logged out and redirected to the login page. All requests will target{' '}
            <span className={cn('font-medium', style.text)}>{displayUrl}</span>.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors',
              style.button,
              style.buttonHover
            )}
          >
            Yes, Switch
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
