import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Ride Profit Calculator',
  description: 'Calculator for ride profits across all platforms',
  applicationName: 'RideProfit',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'RideProfit',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    images: '/social-share.png',
  },
  twitter: {
    card: 'summary_large_image',
    images: '/social-share.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00ff00',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
