import {Suspense} from 'react'
import {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import {ColorModeProvider} from '~/components/providers/ColorModeContext'
import {MagicScriptTag} from '~/components/theme/InlineCssVariables'
import {Providers} from './providers'
import '../styles/index.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
})

const APP_NAME = 'X-Cart app'
const APP_DEFAULT_TITLE = 'X-Cart front app'
const APP_TITLE_TEMPLATE = '%s - X-Cart front app'
const APP_DESCRIPTION = 'X-Cart demo store front app'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  themeColor: '#FFFFFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [{url: '/icons/touch-icon-iphone.png', sizes: '180x180'}],
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="bg-contrast leading-base text-primary antialiased">
        <MagicScriptTag />
        <ColorModeProvider>
          <Providers>
            <Suspense>{children}</Suspense>
          </Providers>
        </ColorModeProvider>
      </body>
    </html>
  )
}
