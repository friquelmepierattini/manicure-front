import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Nunito } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mi Manicurista - Reserva tu Cita',
  description:
    'Encuentra los mejores profesionales de manicura, cejas y pestañas en tu ciudad',
  keywords: 'manicura, uñas, cejas, pestañas, belleza, reservar',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Mi Manicurista',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#e91e63',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${nunito.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%23e91e63' width='192' height='192' rx='45'/><text x='50%' y='50%' font-size='80' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='central'>💅</text></svg>"
        />
      </head>
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}

function ServiceWorkerRegister() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
              const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)

              if (isLocalhost) {
                try {
                  const registrations = await navigator.serviceWorker.getRegistrations()
                  await Promise.all(registrations.map((registration) => registration.unregister()))

                  if ('caches' in window) {
                    const cacheKeys = await caches.keys()
                    await Promise.all(
                      cacheKeys
                        .filter((key) => key.startsWith('mi-manicurista'))
                        .map((key) => caches.delete(key))
                    )
                  }
                } catch (error) {
                  console.log('❌ Error limpiando Service Worker en localhost:', error)
                }
                return
              }

              navigator.serviceWorker.register('/service-worker.js').then(
                (registration) => {
                  console.log('✅ Service Worker registrado exitosamente:', registration)
                },
                (error) => {
                  console.log('❌ Service Worker error:', error)
                }
              )
            })
          }
        `,
      }}
    />
  )
}
