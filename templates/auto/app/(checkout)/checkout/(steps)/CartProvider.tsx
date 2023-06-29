'use client'

import {Provider} from 'jotai'

export function CartProvider({children}: {children: React.ReactNode}) {
  return <Provider>{children}</Provider>
}
