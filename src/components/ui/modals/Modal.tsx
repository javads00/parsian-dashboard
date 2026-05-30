import ReactModal from 'react-modal'
import { type ModalInterface } from '@/typescript'

export const Modal: React.FC<ModalInterface> = ({
  isOpen,
  title,
  children,
  className = '',
  onAfterClose,
  onAfterOpen,
  onRequestHide,
}) => {
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        overlayClassName={
          'fixed w-full h-full bg-primary/40 backdrop-sm inset-0 z-[9999999999] flex justify-center items-center'
        }
        className={`${className} min-w-96 bg-white p-2 shadow-inner outline-none`}
        onAfterClose={() => {
          onAfterClose?.()
        }}
        onAfterOpen={() => {
          onAfterOpen?.()
        }}
        onRequestClose={onRequestHide} // استفاده از onRequestHide به جای onRequestClose
        ariaHideApp={false}
      >
        <p className="mb-2 w-full text-center text-sm">{title}</p>
        {children}
      </ReactModal>
    </>
  )
}
