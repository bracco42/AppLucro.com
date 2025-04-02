import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ride Profit Calculator',
  description: 'Calculator for ride profits across all platforms',
  manifest: '/manifest.json',
  themeColor: '#00ff00',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="RideProfit" />
      </head>
      <body>{children}</body>
    </html>
  )
}
