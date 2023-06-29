'use client'

import {ReactNode, useState, FC} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {SessionProvider} from 'next-auth/react'

// eslint-disable-next-line func-names
export const Providers: FC<{children: ReactNode}> = function ({children}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
