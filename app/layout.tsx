import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import '@/app/globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'develetter',
  description: 'develetter is develetter'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col h-[calc(100vh_-_theme(spacing.32))] overflow-x-hidden overflow-y-auto">
              {children}
            </main>
            <Footer />
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
      <Analytics />
    </html>
  )
}
