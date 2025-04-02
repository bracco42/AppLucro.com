import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ride Profit Calculator',
  description: 'Calculator for ride profits across all platforms',
  manifest: '/manifest.json',
  themeColor: '#00ff00',
  applicationName: 'RideProfit', // Importante para Android
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' }, // Fallback para navegadores antigos
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }, // Android/Chrome
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }, // Android/Chrome
      { url: '/logo.svg', type: 'image/svg+xml' }, // Para navegadores modernos
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, // iOS Safari
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png', // Fallback para iOS antigo
    },
  },
  appleWebApp: {
    capable: true,
    title: 'RideProfit',
    statusBarStyle: 'black-translucent',
    startupImage: '/apple-splash-screen.png', // Splash screen para iOS
  },
  openGraph: {
    type: 'website',
    images: [{ url: '/social-share.png' }], // Para compartilhamento no Facebook/WhatsApp
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/social-share.png' }], // Para compartilhamento no Twitter
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Meta Tags Universais */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00ff00" />

        {/* Favicon Fallback */}
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* iOS Safari */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="RideProfit" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Splash Screens (iOS) */}
        <link
          href="/apple-splash-screen-iphone.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        {/* Adicione mais splash screens para outros dispositivos iOS se necessário */}

        {/* PWA Manifest (Android/Chrome) */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  )
}
