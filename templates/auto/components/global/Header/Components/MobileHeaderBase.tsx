import Link from 'next/link'
import {Logo} from '~/components/elements/Logo'

export function MobileHeaderBase({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-header w-full items-center justify-between border-b border-gray-300 px-unit-4 lg:hidden">
      <Link href="/" aria-label="Auto Frontapp">
        <Logo className="max-w-[114px] fill-primary" />
      </Link>
      <div className="flex items-center">{children}</div>
    </div>
  )
}
