import { type ReactNode } from 'react'

export * from './Modal'

export interface ModalInterface {
  isOpen: boolean
  title: string
  className?: string
  onAfterClose?: () => void
  onAfterOpen?: () => void
  children?: ReactNode
  onRequestHide?: () => void
}
export interface SaveRequestModalInterface extends Omit<ModalInterface, 'title'> {
  title?: string
}
