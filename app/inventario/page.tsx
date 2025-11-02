"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function InventarioPage() {
  const [inventoryData, setInventoryData] = useState({
    total: 780,
    enTransito: 160,
    pendientes: 250,
    entregado: 330,
  })

  const [showSummary, setShowSummary] = useState(false)

  const handleGenerateSummary = () => {
    setShowSummary(true)
    // Simulate generating a summary
    setTimeout(() => {
      alert(
        `Resumen de Inventario:\n\nTotal de Paquetes: ${inventoryData.total}\nEn Tránsito: ${inventoryData.enTransito}\nPendientes: ${inventoryData.pendientes}\nEntregados: ${inventoryData.entregado}\n\nTasa de entrega: ${((inventoryData.entregado / inventoryData.total) * 100).toFixed(1)}%`,
      )
      setShowSummary(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Summary Generator */}
            <Card className="border-2">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Resumen de inventario</h2>
                <Button
                  onClick={handleGenerateSummary}
                  disabled={showSummary}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                >
                  {showSummary ? "Generando..." : "Generar"}
                </Button>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="space-y-4">
              {/* Total Paquetes */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Paquetes</p>
                      <p className="text-4xl font-bold">{inventoryData.total}</p>
                    </div>
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* En Tránsito */}
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">En Tránsito</p>
                      <p className="text-4xl font-bold">{inventoryData.enTransito}</p>
                    </div>
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Pendientes */}
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                      <p className="text-4xl font-bold">{inventoryData.pendientes}</p>
                    </div>
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Entregado */}
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Entregado</p>
                      <p className="text-4xl font-bold">{inventoryData.entregado}</p>
                    </div>
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Content - Filter Section */}
          <div>
            <div className="bg-blue-900 text-white py-6 px-8 rounded-t-lg">
              <h1 className="text-3xl font-bold text-center tracking-wide">FILTRADO DE INVENTARIO</h1>
            </div>
            <Card className="rounded-t-none min-h-[600px]">
              <CardContent className="p-8">
                <div className="text-center text-gray-500 mt-20">
                  <p className="text-lg">Área de filtros de inventario</p>
                  <p className="text-sm mt-2">Los filtros se implementarán según los requisitos específicos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
