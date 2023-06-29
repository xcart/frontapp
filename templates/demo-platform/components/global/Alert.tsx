'use client'

import clsx from 'clsx'

export interface IAlert {
  message: string
  type?: 'error' | 'warning' | 'info' | 'success'
  open: boolean
  setOpen: () => void
  alertClasses?: string
  alertMessageClasses?: string
  closeClasses?: string
  closeButton?: React.ReactNode
}

export function Alert({
  type = 'info',
  message,
  open,
  setOpen,
  alertClasses,
  alertMessageClasses,
  closeClasses,
  closeButton,
}: IAlert) {
  const alertStyles = clsx('flex justify-between', alertClasses)

  return (
    <>
      {open && (
        <div className={alertStyles} data-type={type}>
          <div className={alertMessageClasses}>{message}</div>
          {closeButton && (
            <button
              className={closeClasses}
              onClick={setOpen}
              type="button"
              aria-label="Close"
            >
              {closeButton}
            </button>
          )}
        </div>
      )}
    </>
  )
}
