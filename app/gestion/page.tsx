"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"

interface Shipment {
  id: string
  guideNumber: string
  sendDate: string
  lastUpdate: string
  status: "En Ruta" | "En Bodega" | "Entregado"
}

export default function ManagementPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "1",
      guideNumber: "12345678901",
      sendDate: "2025-05-10",
      lastUpdate: "15/05/2025",
      status: "En Ruta",
    },
    {
      id: "2",
      guideNumber: "12345678902",
      sendDate: "2025-05-10",
      lastUpdate: "15/05/2025",
      status: "En Bodega",
    },
    {
      id: "3",
      guideNumber: "12345678903",
      sendDate: "2025-05-10",
      lastUpdate: "15/05/2025",
      status: "Entregado",
    },
    {
      id: "4",
      guideNumber: "12345678904",
      sendDate: "2025-05-10",
      lastUpdate: "15/05/2025",
      status: "Entregado",
    },
    {
      id: "5",
      guideNumber: "12345678905",
      sendDate: "2025-05-10",
      lastUpdate: "15/05/2025",
      status: "Entregado",
    },
  ])

  const handleSaveChanges = () => {
    const isSuccess = Math.random() > 0.3
    if (isSuccess) {
      setShowSuccess(true)
    } else {
      setShowError(true)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Ruta":
        return "bg-red-100 text-red-800 border-red-200"
      case "En Bodega":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Entregado":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredShipments = shipments.filter((shipment) => shipment.guideNumber.includes(searchTerm))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue banner with title - more compact */}
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-wide">GESTIÓN DE PAQUETES</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Barra de búsqueda */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">Barra de búsqueda</h2>
              <div className="flex max-w-2xl mx-auto gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Ingresa el número de guía"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button className="h-12 px-8 bg-slate-700 hover:bg-slate-800 text-white">Buscar</Button>
              </div>
            </div>

            {/* Lista de envíos */}
            <div className="space-y-4">
              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold">{shipment.guideNumber}</p>
                          <Badge className={`${getStatusColor(shipment.status)} border`}>{shipment.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Fecha de envío: {shipment.sendDate}</p>
                        <p className="text-sm text-gray-500">Actualizado: {shipment.lastUpdate}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => router.push(`/gestion/${shipment.id}`)}
                      >
                        Consultar
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => router.push(`/gestion/${shipment.id}/editar`)}
                      >
                        Actualizar información
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron paquetes</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm
                      ? `No se encontraron paquetes que coincidan con "${searchTerm}"`
                      : "No hay paquetes disponibles en este momento"}
                  </p>
                  {searchTerm && <p className="text-sm text-gray-500">Intenta buscar por número de guía</p>}
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={handleSaveChanges} className="bg-slate-700 hover:bg-slate-800 text-white px-8">
                Guardar Cambios
              </Button>
              <Link href="/">
                <Button variant="outline" className="px-8 bg-gray-200 hover:bg-gray-300">
                  Salir
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modales */}
      <ConfirmationModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Confirmación"
        message="¡Su solicitud ha sido exitosa!"
        type="success"
      />

      <ConfirmationModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Error"
        message="¡Ha ocurrido un error!"
        type="error"
      />
    </div>
  )
}
