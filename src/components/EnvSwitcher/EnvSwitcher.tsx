import { useAuthStore } from '@/features'
import { cn } from '@/lib/utils'
import { ENV_OPTIONS, setApiEnv, type EnvKey } from '@/utils/envConfig'
import { useNavigate } from '@tanstack/react-router'
import { Check, Globe } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EnvBadge, EnvDot } from './EnvBadge'
import { formatDisplayUrl, getEnvLabel, getEnvStyle } from './envStyles'
import { EnvSwitcherModal } from './EnvSwitcherModal'
import { useApiEnv } from './useApiEnv'

type EnvSwitcherProps = {
  requireConfirmation?: boolean
  variant?: 'default' | 'login'
  className?: string
}

export function EnvSwitcher({
  requireConfirmation = true,
  variant = 'default',
  className,
}: EnvSwitcherProps) {
  const navigate = useNavigate()
  const signOut = useAuthStore((state) => state.signOut)
  const { envKey } = useApiEnv()
  const containerRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [shouldRenderPanel, setShouldRenderPanel] = useState(false)
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const [pendingEnv, setPendingEnv] = useState<EnvKey | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeDropdown = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (isOpen) {
      setShouldRenderPanel(true)
      const frame = requestAnimationFrame(() => setIsPanelVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    setIsPanelVisible(false)
    const timer = window.setTimeout(() => setShouldRenderPanel(false), 100)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) {
        return
      }
      closeDropdown()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeDropdown])

  const applyEnvChange = async (nextEnv: EnvKey) => {
    if (nextEnv === envKey) {
      return
    }

    setApiEnv(nextEnv)

    if (requireConfirmation) {
      await signOut?.()
      navigate({ to: '/login' })
    }
  }

  const handleSelect = (nextEnv: EnvKey) => {
    if (nextEnv === envKey) {
      closeDropdown()
      return
    }

    closeDropdown()

    if (requireConfirmation) {
      setPendingEnv(nextEnv)
      setIsModalOpen(true)
      return
    }

    void applyEnvChange(nextEnv)
  }

  const handleConfirm = () => {
    if (!pendingEnv) {
      return
    }

    void applyEnvChange(pendingEnv)
    setIsModalOpen(false)
    setPendingEnv(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setPendingEnv(null)
  }

  const isLogin = variant === 'login'

  return (
    <>
      <div
        ref={containerRef}
        className={cn('relative z-20', className)}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Switch API environment"
          className="rounded-full outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <EnvBadge
            envKey={envKey}
            isOpen={isOpen}
            variant={isLogin ? 'login' : 'default'}
            showApiPrefix={isLogin}
          />
        </button>

        {shouldRenderPanel && (
          <div
            className={cn(
              'absolute right-0 z-50 mt-2.5 min-w-[272px] origin-top-right',
              'transition-all',
              isPanelVisible
                ? 'pointer-events-auto scale-100 opacity-100 duration-150 ease-out'
                : 'pointer-events-none scale-95 opacity-0 duration-100 ease-in'
            )}
          >
            <div
              className="absolute -top-1 right-5 size-2.5 rotate-45 border border-b-0 border-r-0 border-gray-200/80 bg-white/95 backdrop-blur-md"
            />

            <div
              role="listbox"
              aria-label="API environments"
              className="overflow-hidden rounded-xl border border-gray-200/80 bg-white/95 shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2.5">
                <Globe className="size-3.5 text-gray-400" />
                <span className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                  API Environment
                </span>
              </div>

              <div className="p-1.5">
                {ENV_OPTIONS.map((option, index) => {
                  const style = getEnvStyle(option.key)
                  const isActive = envKey === option.key

                  return (
                    <div key={option.key}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleSelect(option.key)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150',
                          isActive ? style.rowActive : style.rowHover
                        )}
                      >
                        <EnvDot envKey={option.key} size="md" />

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              'text-sm leading-tight',
                              isActive ? cn('font-bold', style.text) : 'font-semibold text-gray-800'
                            )}
                          >
                            {getEnvLabel(option.key)}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-gray-400">
                            {formatDisplayUrl(option.key)}
                          </p>
                        </div>

                        <Check
                          className={cn(
                            'size-4 shrink-0 transition-opacity duration-150',
                            isActive ? cn('opacity-100', style.check) : 'opacity-0'
                          )}
                          strokeWidth={2.5}
                        />
                      </button>

                      {index < ENV_OPTIONS.length - 1 && (
                        <div className="mx-3 border-t border-gray-100" />
                      )}
                    </div>
                  )
                })}
              </div>

              {!requireConfirmation && (
                <div className="border-t border-gray-100 px-4 py-2">
                  <p className="text-center text-[11px] text-gray-400">
                    Changes apply immediately
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {requireConfirmation && (
        <EnvSwitcherModal
          open={isModalOpen}
          targetEnv={pendingEnv}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </>
  )
}
