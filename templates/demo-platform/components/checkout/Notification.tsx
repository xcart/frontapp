'use client'

import {createContext, useContext, useMemo, useState} from 'react'
import {Provider} from 'jotai'
import {ButtonIcon, ButtonProps, IButton} from '~/components/elements/Button'
import {IconClose, IconSuccess, IconWarning} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'

interface INotificaton {
  opened: boolean
  type: 'error' | 'warning' | 'success'
  content: string
}

interface INotificationContext {
  notification: INotificaton
  setNotification: (v: INotificaton) => void
}

export const NotificationContext = createContext<INotificationContext>({
  notification: {opened: false, type: 'error', content: ''},
  setNotification: () => {},
})
NotificationContext.displayName = 'NotificationContext'

export function useNotification() {
  return useContext(NotificationContext)
}

function CloseButton({children, onClick, ...props}: IButton & ButtonProps) {
  return (
    <ButtonIcon
      className="relative -right-[4px] h-unit-4 w-unit-4 md:-right-[10px] md:h-unit-6 md:w-unit-6"
      onClick={onClick}
      {...props}
      aria-label="Close"
    >
      {children}
    </ButtonIcon>
  )
}

export function Notification() {
  const {notification, setNotification} = useNotification()

  const {opened, type, content} = notification

  let bgColor
  switch (type) {
    case 'error':
      bgColor = 'bg-error-alert'
      break
    case 'success':
      bgColor = 'bg-success'
      break
    case 'warning':
      bgColor = 'bg-warning'
      break
    default:
      bgColor = 'bg-error-alert'
      break
  }

  return opened && content ? (
    <div className="absolute -bottom-[60px] left-0 right-0 block h-unit-12">
      <div
        className={tailwindMerge(
          'absolute left-0 right-0 top-0 z-20 flex min-h-[60px] justify-center px-unit-4 py-unit-3',
          bgColor,
        )}
      >
        <div className="flex gap-unit pr-unit-8 align-middle">
          <span className="flex h-unit-6 w-unit-4 items-center">
            {type === 'success' ? <IconSuccess /> : <IconWarning />}
          </span>
          <span>{content}</span>
        </div>
        <CloseButton
          onClick={() =>
            setNotification({opened: false, type: 'error', content: ''})
          }
          className="absolute right-unit-4 top-unit-4 h-unit-4 w-unit-4 hover:bg-inherit"
        >
          <IconClose className="fill-gray-700" />
        </CloseButton>
      </div>
    </div>
  ) : null
}

export function NotificationProvider({children}: {children: React.ReactNode}) {
  const [notification, setNotification] = useState<INotificaton>({
    opened: false,
    type: 'error',
    content: '',
  })
  const notificationContextProviderValue = useMemo(
    () => ({notification, setNotification}),
    [notification, setNotification],
  )
  return (
    <NotificationContext.Provider value={notificationContextProviderValue}>
      <Provider>{children}</Provider>
    </NotificationContext.Provider>
  )
}
