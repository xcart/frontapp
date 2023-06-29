import Footer from '~/components/global/Footer'
import Header from '~/components/global/Header'
import {MMYFilterWrapper} from '~/components/mmy/MMYFilter/MMYFilterWrapper'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_auto_1fr_auto]">
      {/* @ts-expect-error Server Component */}
      <Header />
      {/* @ts-expect-error Server Component */}
      <MMYFilterWrapper />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
