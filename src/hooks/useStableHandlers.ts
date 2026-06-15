import { useMemo, useRef } from 'react'

type HandlerMap = {
  onEdit?: (row: never) => void
  onDelete?: (id: string) => void
}

export function useStableHandlers<T extends HandlerMap>(handlers: T): T {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  return useMemo(() => {
    const stable = {} as T

    if (handlers.onEdit) {
      stable.onEdit = ((row: Parameters<NonNullable<T['onEdit']>>[0]) => {
        handlersRef.current.onEdit?.(row)
      }) as T['onEdit']
    }

    if (handlers.onDelete) {
      stable.onDelete = ((id: string) => {
        handlersRef.current.onDelete?.(id)
      }) as T['onDelete']
    }

    return stable
  }, [handlers.onEdit, handlers.onDelete])
}
