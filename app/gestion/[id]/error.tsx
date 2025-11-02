"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Package detail error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="border-4 border-blue-500 rounded-lg overflow-hidden bg-white">
          <div className="bg-white py-8">
            <h1 className="text-4xl font-bold text-center text-blue-900">ERROR</h1>
          </div>

          <Card className="m-6">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar el paquete</h2>
              <p className="text-gray-600 mb-6">
                No se pudo cargar la información del paquete. Por favor, intenta de nuevo.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700">
                  Intentar de nuevo
                </Button>
                <Button asChild variant="outline">
                  <Link href="/gestion">Volver a gestión</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
