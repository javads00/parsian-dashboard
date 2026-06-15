declare module 'react-modal' {
  import type { ComponentType, ReactNode } from 'react'

  export interface ModalProps {
    isOpen: boolean
    onRequestClose?: () => void
    onAfterOpen?: () => void
    onAfterClose?: () => void
    className?: string
    overlayClassName?: string
    contentLabel?: string
    ariaHideApp?: boolean
    children?: ReactNode
  }

  const Modal: ComponentType<ModalProps>
  export default Modal

  export function setAppElement(element: string | HTMLElement): void
}
