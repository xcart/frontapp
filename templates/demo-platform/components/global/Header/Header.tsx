import Link from 'next/link'
import {getXCartClient} from 'app/client'
import {DesktopHeader} from '~/components/global/Header/DesktopHeader'
import {MobileHeader} from '~/components/global/Header/MobileHeader'
import {DesktopMyAccount} from './DesktopMyAccount'

export async function Header() {
  const client = await getXCartClient()
  const rootCategories = await client.getRootCategories({
    categoriesCount: 3,
  })

  return (
    <>
      <div className="hidden bg-gray-300 lg:block">
        <div className="page flex h-unit-8 items-center justify-end px-unit-16">
          <Link
            href="/"
            className="px-unit-2 text-xs text-gray-700 no-underline"
          >
            Service
          </Link>
          <DesktopMyAccount user={client.hasAccessToken()} />
        </div>
      </div>
      <header className="sticky top-0 z-header bg-contrast">
        <MobileHeader
          categories={rootCategories}
          user={client.hasAccessToken()}
        />
        <DesktopHeader categories={rootCategories} />
      </header>
    </>
  )
}
