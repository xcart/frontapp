import Link from 'next/link'
import {Logo} from '~/components/elements/Logo'
import {Notification} from './Notification'

export default function Header() {
  return (
    <>
      <div className="hidden h-unit-8 lg:block" />
      <header className="sticky top-0 z-header bg-contrast">
        <div className="flex h-header w-full items-center justify-between border-b border-gray-300 px-unit-4 lg:hidden">
          <Logo className="max-w-[114px] fill-primary" />
          <div className="flex items-center text-sm">
            <Link href="/" aria-label="Demo Frontapp">
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="page flex h-header w-full items-center justify-between border-b border-gray-300 px-unit-16">
            <div className="flex items-center">
              <Logo className="mr-unit-10 fill-primary" />
            </div>
            <div className="flex items-center text-sm">
              <Link href="/" aria-label="Demo Frontapp">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Notification />
      </header>
    </>
  )
}
