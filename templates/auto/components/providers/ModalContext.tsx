'use client'

import React, {createContext, useContext} from 'react'

interface ModalContextInterface {
  open: boolean
  setOpen: (v: boolean) => void
}

export const ModalContext = createContext<ModalContextInterface>({
  open: false,
  setOpen: () => {},
})
ModalContext.displayName = 'ModalContext'

export function useModal() {
  return useContext(ModalContext)
}

export function ModalProvider({
  value,
  children,
}: {
  value: ModalContextInterface
  children: React.ReactNode
}) {
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
