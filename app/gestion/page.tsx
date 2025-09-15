"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ChevronDown } from "lucide-react"
import Link from "next/link"
import { NavHeader } from "@/components/navigation/nav-header"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"

interface Shipment {
  id: string
  guideNumber: string
  customerName: string
  lastUpdate: string
  status: "En Ruta" | "En Bodega" | "Entregado"
}

export default function ManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "1",
      guideNumber: "12345678901",
      customerName: "María González",
      lastUpdate: "15/01/2025",
      status: "En Ruta",
    },
    {
      id: "2",
      guideNumber: "12345678902",
      customerName: "María González",
      lastUpdate: "15/01/2025",
      status: "En Bodega",
    },
    {
      id: "3",
      guideNumber: "12345678903",
      customerName: "María González",
      lastUpdate: "15/01/2025",
      status: "Entregado",
    },
    {
      id: "4",
      guideNumber: "12345678904",
      customerName: "María González",
      lastUpdate: "15/01/2025",
      status: "Entregado",
    },
    {
      id: "5",
      guideNumber: "12345678905",
      customerName: "María González",
      lastUpdate: "15/01/2025",
      status: "Entregado",
    },
  ])

  const updateShipmentStatus = (id: string, newStatus: "En Ruta" | "En Bodega" | "Entregado") => {
    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === id
          ? { ...shipment, status: newStatus, lastUpdate: new Date().toLocaleDateString("es-ES") }
          : shipment,
      ),
    )
  }

  const handleSaveChanges = () => {
    // Simular éxito o error aleatoriamente
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

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.guideNumber.includes(searchTerm) ||
      shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      {/* Header con gradiente azul */}
      <div className="transport-bg text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="transport-title text-white mb-8">GESTIÓN DE ESTADO DE PAQUETES</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-6 -mt-8">
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
              {filteredShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold">{shipment.guideNumber}</p>
                      <p className="text-sm text-gray-600">{shipment.customerName}</p>
                      <p className="text-sm text-gray-500">Actualizado: {shipment.lastUpdate}</p>
                    </div>
                    <Badge className={`${getStatusColor(shipment.status)} border`}>{shipment.status}</Badge>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        Actualizar Estado
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => updateShipmentStatus(shipment.id, "En Ruta")}>
                        En Ruta
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateShipmentStatus(shipment.id, "En Bodega")}>
                        En Bodega
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateShipmentStatus(shipment.id, "Entregado")}>
                        Entregado
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Guardar Cambios
              </Button>
              <Link href="/">
                <Button variant="outline" className="px-8 bg-transparent">
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
