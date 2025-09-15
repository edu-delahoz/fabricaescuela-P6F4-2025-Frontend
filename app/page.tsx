"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Package, Route, Bell, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { NavHeader } from "@/components/navigation/nav-header"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [showNotFound, setShowNotFound] = useState(false)

  const handleSearch = () => {
    if (!trackingNumber.trim()) {
      setShowNotFound(true)
      return
    }

    // datos de rastreo
    setTrackingData({
      guideNumber: trackingNumber,
      origin: "Bogotá, Colombia",
      destination: "Medellín, Colombia",
      currentLocation: "Centro de Distribución Girardot",
      weight: "2,5 Kg",
      dimensions: "30 x 20 x 15 cm",
      lastUpdate: "02/09/2025",
      status: "En tránsito",
      news: "No se han registrado novedades",
      route: [
        { location: "Centro de Distribución, Bogotá", date: "02/09/2025", status: "completed" },
        { location: "Hub Central, Bogotá", date: "02/09/2025", status: "completed" },
        { location: "Centro de Distribución regional, Melgar", date: "02/09/2025", status: "completed" },
        { location: "Centro de Distribución regional, Girardot", date: "02/09/2025", status: "current" },
        { location: "Entrega Final, Medellín", date: "02/09/2025", status: "pending" },
      ],
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      {/* Header con gradiente azul */}
      <div className="transport-bg text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="transport-title text-white mb-8">RASTREA TU ENVÍO</h1>

          {/* Barra de búsqueda */}
          <div className="flex max-w-2xl mx-auto gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Ingresa el número de guía"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-10 h-12 text-lg bg-white text-black"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="h-12 px-8 bg-slate-700 hover:bg-slate-800 text-white">
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-6 -mt-8">
        {trackingData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información de la guía */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Guía N° {trackingData.guideNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ruta de envío */}
                    <div>
                      <h3 className="flex items-center gap-2 font-semibold mb-3">
                        <Route className="h-4 w-4" />
                        Ruta de envío
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Origen</p>
                          <p className="font-medium">{trackingData.origin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Destino</p>
                          <p className="font-medium">{trackingData.destination}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ubicación Actual</p>
                          <p className="font-medium text-blue-600">{trackingData.currentLocation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Detalles de envío */}
                    <div>
                      <h3 className="flex items-center gap-2 font-semibold mb-3">
                        <Package className="h-4 w-4" />
                        Detalles de envío
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Peso</p>
                          <p className="font-medium">{trackingData.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Dimensiones</p>
                          <p className="font-medium">{trackingData.dimensions}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      Última Actualización: {trackingData.lastUpdate}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Novedades del envío */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Novedades del Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bell className="h-4 w-4" />
                    <p>{trackingData.news}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recorrido del envío */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Recorrido De Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.route.map((step: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              step.status === "completed"
                                ? "bg-green-500"
                                : step.status === "current"
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                            }`}
                          />
                          {index < trackingData.route.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium">Paso por:</p>
                          <p className="font-semibold">{step.location}</p>
                          <p className="text-sm text-gray-600">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Navegación */}
        <div className="mt-8 text-center">
          <Link href="/gestion">
            <Button variant="outline" className="mr-4 bg-transparent">
              Ir a Gestión de Estados
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal de error para número no encontrado */}
      <ConfirmationModal
        isOpen={showNotFound}
        onClose={() => setShowNotFound(false)}
        title="Error"
        message="Número de guía no encontrado. Por favor verifica e intenta nuevamente."
        type="error"
      />
    </div>
  )
}
