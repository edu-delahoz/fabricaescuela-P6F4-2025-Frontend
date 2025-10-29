"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PackageDetailProps {
  params: Promise<{ id: string }>
}

// Mock data - in a real app, this would come from an API or database
const getPackageData = (id: string) => {
  return {
    id: id,
    guideNumber: "12345678901",
    status: "Entregado" as const,
    sendDate: "2025-05-10",
    lastUpdate: "15/05/2025",
    recipient: {
      type: "CC",
      document: "0123456789",
      name: "MARIA ALEJANDRA GONZALES MARTIN",
      address: "KR 51 B # 85 A-36, PRADO",
      phone: "3006258951",
      city: "MEDELLIN / ANTIOQUIA",
      email: "mariaaleja222@gmail.com",
    },
    sender: {
      type: "CC",
      document: "0123456789",
      name: "DAVID ALONSO MORENO PEREZ",
      address: "CL 51 SUR # 67 - 14, LAS VILLAS",
      phone: "3006287951",
      city: "BOGOTA D.C.",
      email: "7david7alonsop@gmail.com",
    },
    shipmentData: {
      packageType: "PAQUETE PEQUEÑO",
      pieces: "1",
      weight: "2",
      service: "MENSAJERÍA",
      paymentMethod: "Contado",
      serviceValue: "$18,000.00",
      commercialValue: "$46,000.00",
      content: "Calzado",
      observations: "Contenido sin verificar",
    },
    updates: [],
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

export default async function PackageDetailPage({ params }: PackageDetailProps) {
  const resolvedParams = await params
  const packageData = getPackageData(resolvedParams.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content with blue border */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="border-4 border-blue-500 rounded-lg overflow-hidden bg-white">
          {/* Title section */}
          <div className="bg-white py-8">
            <h1 className="text-4xl font-bold text-center text-blue-900">INFORMACIÓN</h1>
          </div>

          {/* Three column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Destinatario */}
            <Card className="overflow-hidden">
              <div className="bg-blue-600 text-white py-3 px-4">
                <h2 className="text-xl font-semibold text-center">Destinatario</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Tipo:</span>
                  <span className="text-gray-700">{packageData.recipient.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Documento:</span>
                  <span className="text-gray-700">{packageData.recipient.document}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Nombre:</span>
                  <span className="text-gray-700 text-right">{packageData.recipient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Dirección:</span>
                  <span className="text-gray-700 text-right">{packageData.recipient.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Teléfono:</span>
                  <span className="text-gray-700">{packageData.recipient.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Ciudad:</span>
                  <span className="text-gray-700 text-right">{packageData.recipient.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">E-mail:</span>
                  <span className="text-gray-700 text-right break-all">{packageData.recipient.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Remitente */}
            <Card className="overflow-hidden">
              <div className="bg-blue-600 text-white py-3 px-4">
                <h2 className="text-xl font-semibold text-center">Remitente</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Tipo:</span>
                  <span className="text-gray-700">{packageData.sender.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Documento:</span>
                  <span className="text-gray-700">{packageData.sender.document}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Nombre:</span>
                  <span className="text-gray-700 text-right">{packageData.sender.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Dirección:</span>
                  <span className="text-gray-700 text-right">{packageData.sender.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Teléfono:</span>
                  <span className="text-gray-700">{packageData.sender.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Ciudad:</span>
                  <span className="text-gray-700 text-right">{packageData.sender.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">E-mail:</span>
                  <span className="text-gray-700 text-right break-all">{packageData.sender.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Datos de envío */}
            <Card className="overflow-hidden">
              <div className="bg-blue-600 text-white py-3 px-4">
                <h2 className="text-xl font-semibold text-center">Datos de envío</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Tipo de empaque:</span>
                  <span className="text-gray-700 text-right">{packageData.shipmentData.packageType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">No. de Piezas:</span>
                  <span className="text-gray-700">{packageData.shipmentData.pieces}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Peso en Kg:</span>
                  <span className="text-gray-700">{packageData.shipmentData.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Servicio:</span>
                  <span className="text-gray-700">{packageData.shipmentData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Forma de pago:</span>
                  <span className="text-gray-700">{packageData.shipmentData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Valor servicio:</span>
                  <span className="text-gray-700">{packageData.shipmentData.serviceValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Valor comercial:</span>
                  <span className="text-gray-700">{packageData.shipmentData.commercialValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Contenido:</span>
                  <span className="text-gray-700">{packageData.shipmentData.content}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Observaciones:</span>
                  <span className="text-gray-700 text-right">{packageData.shipmentData.observations}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Novedades del Envío */}
          <div className="p-6 pt-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Novedades del Envío</h2>
                {packageData.updates.length > 0 ? (
                  <div className="space-y-2">
                    {packageData.updates.map((update, index) => (
                      <p key={index} className="text-gray-700">
                        {update}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No se han registrado novedades para este envío</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Volver button */}
          <div className="p-6 pt-0 flex justify-end">
            <Button asChild variant="outline" className="px-8 bg-gray-200 hover:bg-gray-300">
              <Link href="/gestion">Volver</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
