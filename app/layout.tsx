import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { HighContrastProvider } from "@/components/providers/high-contrast-provider"
import { HighContrastToggle } from "@/components/high-contrast-toggle"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Sistema de Transporte",
  description: "Aplicación para rastreo y gestión de envíos",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <HighContrastProvider>
          <HighContrastToggle className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 pointer-events-auto" />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </HighContrastProvider>
      </body>
    </html>
  )
}
