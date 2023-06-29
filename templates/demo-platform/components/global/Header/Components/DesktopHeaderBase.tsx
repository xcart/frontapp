import Link from 'next/link'
import {Logo} from '~/components/elements/Logo'

export function DesktopHeaderBase({
  children,
  menu,
}: {
  children: React.ReactNode
  menu: React.ReactNode
}) {
  return (
    <div className="hidden lg:block">
      <div className="page flex h-header w-full items-center justify-between border-b border-gray-300 px-unit-16">
        <div className="flex items-center">
          <Link href="/" aria-label="Demo Frontapp">
            <Logo className="mr-unit-10 fill-primary" />
          </Link>
          <div className="flex items-center">{menu}</div>
        </div>
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  )
}
