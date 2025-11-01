"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReporteIncidenciasPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reporte de Incidencias</h1>
          <p className="text-gray-600 mb-8">
            Esta sección está en desarrollo. Pronto podrás gestionar y reportar incidencias relacionadas con los envíos.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">Volver al Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
