import Header from '~/components/checkout/Header'
import {NotificationProvider} from '~/components/checkout/Notification'

export default async function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_auto_1fr_auto]">
      <NotificationProvider>
        <Header />
        <main className="mt-unit-8 overflow-x-hidden px-unit-4 lg:mb-unit-12 lg:px-unit-16">
          {children}
        </main>
      </NotificationProvider>
    </div>
  )
}
