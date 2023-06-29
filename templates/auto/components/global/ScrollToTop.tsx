'use client'

import {useEffect} from 'react'

export function ScrollToTop({page, children}: {page: number, children: React.ReactNode}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [page])

  return <>{children}</>
}
