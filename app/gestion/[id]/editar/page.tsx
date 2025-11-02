"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter, useParams } from "next/navigation"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"

export default function EditPackagePage() {
  const router = useRouter()
  const params = useParams()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  // Location update state
  const [paso, setPaso] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [fechaActualizacion, setFechaActualizacion] = useState("")

  // Address correction state
  const [via, setVia] = useState("KR")
  const [numero, setNumero] = useState("")
  const [tramo, setTramo] = useState("")
  const [orientacion, setOrientacion] = useState("")
  const [cruce, setCruce] = useState("")
  const [metros, setMetros] = useState("")
  const [barrio, setBarrio] = useState("")
  const [addressPreview, setAddressPreview] = useState("")

  // Status update state
  const [nuevoEstado, setNuevoEstado] = useState("")

  const handleVisualizarDireccion = () => {
    const parts = [via, numero, tramo, orientacion, cruce, metros].filter(Boolean)
    const direccion = parts.join(" ")
    const direccionCompleta = barrio ? `${direccion}, ${barrio}` : direccion
    setAddressPreview(direccionCompleta)
  }

  const handleGuardarUbicacion = () => {
    if (!paso || !departamento || !ciudad || !fechaActualizacion) {
      setShowWarning(true)
      return
    }
    setShowSuccess(true)
  }

  const handleGuardarDireccion = () => {
    if (!numero || !barrio) {
      setShowWarning(true)
      return
    }
    setShowSuccess(true)
  }

  const handleGuardarEstado = () => {
    if (!nuevoEstado) {
      setShowWarning(true)
      return
    }
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#3b5998] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-wide">ACTUALIZACIÓN DE INFORMACIÓN</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Actualización de Ubicación */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Actualización de Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paso" className="text-sm font-medium">
                  Paso
                </Label>
                <select
                  id="paso"
                  value={paso}
                  onChange={(e) => setPaso(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona</option>
                  <option value="centro-distribucion">Centro de Distribución</option>
                  <option value="centro-regional">Centro de Distribución Regional</option>
                  <option value="hub-central">Hub Central</option>
                  <option value="entrega-final">Entrega Final</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="departamento" className="text-sm font-medium">
                  Departamento
                </Label>
                <select
                  id="departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona</option>
                  <option value="amazonas">Amazonas</option>
                  <option value="antioquia">Antioquia</option>
                  <option value="arauca">Arauca</option>
                  <option value="atlantico">Atlántico</option>
                  <option value="bolivar">Bolívar</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudad" className="text-sm font-medium">
                  Ciudad
                </Label>
                <select
                  id="ciudad"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona</option>
                  <option value="caceres">Cáceres</option>
                  <option value="caucasia">Caucasia</option>
                  <option value="el-bagre">El Bagre</option>
                  <option value="medellin">Medellín</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha" className="text-sm font-medium">
                  Fecha de Actualización
                </Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fechaActualizacion}
                  onChange={(e) => setFechaActualizacion(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full bg-white"
                />
              </div>

              <Button onClick={handleGuardarUbicacion} className="w-full bg-[#2c3e50] hover:bg-[#34495e] mt-2">
                Guardar
              </Button>

              <div className="border rounded-lg p-4 bg-gray-50 mt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold mb-1">Paso por:</p>
                    <p className="text-sm text-gray-700">Centro de Distribución, Medellín.</p>
                    <p className="text-sm text-gray-500">02/09/2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Correción de Detalles en Dirección */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Correción de Detalles en Dirección</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="via" className="text-sm font-medium">
                    Vía
                  </Label>
                  <select
                    id="via"
                    value={via}
                    onChange={(e) => setVia(e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="CL">CL</option>
                    <option value="KR">KR</option>
                    <option value="DG">DG</option>
                    <option value="av">av.</option>
                    <option value="Tv">Tv.</option>
                    <option value="AUT">AUT</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero" className="text-sm font-medium">
                    Número
                  </Label>
                  <Input
                    id="numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="Ej. 51"
                    className="w-full bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tramo" className="text-sm font-medium">
                    Tramo
                  </Label>
                  <Input
                    id="tramo"
                    value={tramo}
                    onChange={(e) => setTramo(e.target.value)}
                    placeholder="Ej.A/B/C/Bis"
                    className="w-full bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orientacion" className="text-sm font-medium">
                    Orientación
                  </Label>
                  <select
                    id="orientacion"
                    value={orientacion}
                    onChange={(e) => setOrientacion(e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecciona</option>
                    <option value="sur">Sur</option>
                    <option value="no-aplica">No aplica</option>
                    <option value="este">Este</option>
                    <option value="oeste">Oeste</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cruce" className="text-sm font-medium">
                    Cruce
                  </Label>
                  <Input
                    id="cruce"
                    value={cruce}
                    onChange={(e) => setCruce(e.target.value)}
                    placeholder="Ej. 8/85A"
                    className="w-full bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metros" className="text-sm font-medium">
                    Metros
                  </Label>
                  <Input
                    id="metros"
                    value={metros}
                    onChange={(e) => setMetros(e.target.value)}
                    placeholder="Ej. 36"
                    className="w-full bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="barrio" className="text-sm font-medium">
                    Barrio o Sector
                  </Label>
                  <Button
                    variant="link"
                    onClick={handleVisualizarDireccion}
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm"
                  >
                    Visualizar
                  </Button>
                </div>
                <Input
                  id="barrio"
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                  placeholder="Ej. PRADO"
                  className="w-full bg-white"
                />
              </div>

              {addressPreview && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium">{addressPreview}</p>
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <Button variant="outline" className="flex-1 bg-gray-200 hover:bg-gray-300 border-gray-300">
                  Aplicar
                </Button>
                <Button onClick={handleGuardarDireccion} className="flex-1 bg-[#2c3e50] hover:bg-[#34495e]">
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actualización de Estado */}
        <Card className="mb-6 border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Actualización de Estado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-w-md space-y-2">
              <Label htmlFor="estado" className="text-sm font-medium">
                Actualizar Estado
              </Label>
              <select
                id="estado"
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Actualizar Estado</option>
                <option value="en-ruta">En Ruta</option>
                <option value="en-bodega">En Bodega</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>

            <Button onClick={handleGuardarEstado} className="bg-[#2c3e50] hover:bg-[#34495e]">
              Guardar cambios
            </Button>
          </CardContent>
        </Card>

        {/* Volver button */}
        <div className="flex justify-start">
          <Button
            variant="outline"
            onClick={() => router.push("/gestion")}
            className="px-8 bg-gray-200 hover:bg-gray-300 border-gray-300"
          >
            Volver
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Confirmación"
        message="¡Los cambios se han guardado exitosamente!"
        type="success"
      />

      <ConfirmationModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Error"
        message="Ha ocurrido un error al guardar los cambios. Por favor, intenta de nuevo."
        type="error"
      />

      <ConfirmationModal
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        title="Advertencia"
        message="Por favor, completa todos los campos requeridos antes de guardar."
        type="warning"
      />
    </div>
  )
}
