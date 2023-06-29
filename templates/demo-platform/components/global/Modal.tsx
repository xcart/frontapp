'use client'

import * as Dialog from '@radix-ui/react-dialog'

export interface IModal {
  children: React.ReactNode
  defaultOpen?: Dialog.DialogProps['defaultOpen']
  modalOpen?: Dialog.DialogProps['open']
  modal?: Dialog.DialogProps['modal']
  onOpenChange?: Dialog.DialogProps['onOpenChange']
  hasTrigger?: boolean
  triggerElementClasses?: string
  triggerElementChildren?: React.ReactNode
  hasOverlay?: boolean
  modalOverlayClasses?: string
  modalClasses?: string
  modalTitle?: string
  modalTitleClasses?: string
  modalDescription?: string
  modalDescriptionClasses?: string
  modalCloseClasses?: string
  modalCloseChildren?: React.ReactNode
  onOpenAutoFocus?: Dialog.DialogContentProps['onOpenAutoFocus']
  onCloseAutoFocus?: Dialog.DialogContentProps['onCloseAutoFocus']
  onEscapeKeyDown?: Dialog.DialogContentProps['onEscapeKeyDown']
  onPointerDownOutside?: Dialog.DialogContentProps['onPointerDownOutside']
}

function ModalTrigger({
  tag: Component = 'span',
  triggerElementClasses,
  children,
}: {
  tag?: React.ElementType
  triggerElementClasses?: string
  children?: React.ReactNode
}) {
  return <Component className={triggerElementClasses}>{children}</Component>
}

export function Modal({
  children,
  defaultOpen,
  modal = true,
  modalOpen,
  onOpenChange,
  hasTrigger = false,
  triggerElementChildren,
  triggerElementClasses,
  hasOverlay = true,
  modalOverlayClasses = 'fixed z-10 bg-black/50 backdrop-blur-sm top-0 right-0 bottom-0 left-0',
  modalClasses = 'fixed z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-12',
  modalTitle,
  modalTitleClasses,
  modalDescription,
  modalDescriptionClasses,
  modalCloseClasses = 'absolute top-3 right-3 text-sm',
  modalCloseChildren,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
}: IModal) {
  return (
    <Dialog.Root
      defaultOpen={defaultOpen}
      modal={modal}
      open={modalOpen}
      onOpenChange={onOpenChange}
    >
      {hasTrigger && (
        <Dialog.Trigger data-testid="DialogTrigger">
          <ModalTrigger triggerElementClasses={triggerElementClasses}>
            {triggerElementChildren}
          </ModalTrigger>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        {hasOverlay && <Dialog.Overlay className={modalOverlayClasses} />}
        <Dialog.Content
          className={modalClasses}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          data-testid="DialogContent"
        >
          {modalTitle && (
            <Dialog.Title className={modalTitleClasses}>
              {modalTitle}
            </Dialog.Title>
          )}
          {modalDescription && (
            <Dialog.Description className={modalDescriptionClasses}>
              {modalDescription}
            </Dialog.Description>
          )}
          {children}
          {modalCloseChildren && (
            <Dialog.Close
              className={modalCloseClasses}
              data-testid="DialogClose"
            >
              {modalCloseChildren}
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
