"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Gestion page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-wide">GESTIÓN DE PAQUETES</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Card>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar la página</h2>
            <p className="text-gray-600 mb-6">Ha ocurrido un error al cargar la información de gestión de paquetes.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700">
                Intentar de nuevo
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Volver al inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
