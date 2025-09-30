'use client'

import React from 'react'
import {ButtonIcon} from '~/components/elements/Button'
import {
  IconInfo,
  IconClose,
  IconWarning,
  IconSuccess,
} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'

export interface IAlert {
  message?: string | null
  type?: 'error' | 'warning' | 'info' | 'success'
  onCloseHandler: () => void
  alertClasses?: string
  alertMessageClasses?: string
  closeClasses?: string
  closeButton?: boolean
}

export function Alert({
  type = 'info',
  message,
  onCloseHandler,
  alertClasses,
  alertMessageClasses,
  closeClasses,
  closeButton = true,
}: IAlert) {
  let alertBgColor = 'bg-warning'
  let alertIcon = <IconInfo />

  if (type === 'error') {
    alertBgColor = 'bg-error'
    alertIcon = <IconWarning />
  } else if (type === 'success') {
    alertBgColor = 'bg-success'
    alertIcon = <IconSuccess />
  }

  const alertStyles = tailwindMerge(
    'fixed z-modal left-0 right-0 top-0 z-20 flex min-h-[60px] items-center justify-center px-unit-4',
    alertBgColor,
    alertClasses,
  )

  return (
    <>
      {message && (
        <div className={alertStyles}>
          <div className="flex w-full justify-center">
            <div
              className={tailwindMerge(
                'flex items-center',
                alertMessageClasses,
              )}
            >
              <span className="mr-unit">{alertIcon}</span> {message}
            </div>
          </div>
          {closeButton && (
            <ButtonIcon
              className={tailwindMerge(
                'relative -right-[4px] h-unit-4 w-unit-4 hover:bg-transparent md:-right-[10px] md:h-unit-6 md:w-unit-6',
                closeClasses,
              )}
              onClick={onCloseHandler}
              aria-label="Close"
            >
              <IconClose />
            </ButtonIcon>
          )}
        </div>
      )}
    </>
  )
}
