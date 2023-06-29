'use client'

import React from 'react'
import {IconInfo, IconWarning} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'

export interface IAlert {
  message: string | React.ReactNode
  type?: 'error' | 'warning' | 'info' | 'success'
  alertClasses?: string
  alertMessageClasses?: string
  closeClasses?: string
  closeButton?: React.ReactNode
}

export function Alert({
  type = 'error',
  message,
  alertClasses,
  alertMessageClasses,
  closeButton,
  ...props
}: IAlert) {
  const alertStyles = tailwindMerge(
    'absolute left-0 right-0 top-0 z-20 flex min-h-[60px] items-center justify-center px-unit-4',
    type === 'error' ? 'bg-error-alert' : 'bg-warning',
    alertClasses,
  )

  const alertMessageStyles = tailwindMerge(
    'flex justify-center gap-unit pr-unit-8 align-middle',
    alertMessageClasses,
  )

  return (
    <div className={alertStyles} {...props}>
      <div className={alertMessageStyles}>
        <span className="flex h-unit-6 w-unit-4 items-center justify-center">
          {type === 'error' ? <IconWarning /> : <IconInfo />}
        </span>
        <span>{message}</span>
      </div>
      {closeButton}
    </div>
  )
}
