import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ride Profit Calculator',
  description: 'Calculator for ride profits across all platforms',
  manifest: '/manifest.json',
  themeColor: '#00ff00',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.svg'
    }
  },
  appleWebApp: {
    capable: true,
    title: 'RideProfit',
    statusBarStyle: 'black-translucent'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="mask-icon" href="/logo.svg" color="#00ff00" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="RideProfit" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
