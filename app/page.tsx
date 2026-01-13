"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, Route, Bell, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { NavHeader } from "@/components/navigation/nav-header";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";
import { packageService } from "@/lib/api-client";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setShowNotFound(true);
      return;
    }

    setIsLoading(true);
    setShowNotFound(false);
    setTrackingData(null);

    try {
      // Obtener información del paquete
      const paquete = await packageService.getByCode(trackingNumber.trim());

      if (!paquete) {
        setShowNotFound(true);
        setIsLoading(false);
        return;
      }

      // Obtener ubicaciones del paquete
      const ubicaciones = await packageService.getUbicaciones(
        trackingNumber.trim()
      );

      // Ordenar ubicaciones por fecha (de más antigua a más reciente)
      const ubicacionesOrdenadas = [...ubicaciones].sort((a: any, b: any) => {
        const fechaA = new Date(a.fechaRegistro).getTime();
        const fechaB = new Date(b.fechaRegistro).getTime();
        return fechaA - fechaB;
      });

      // Mapear las ubicaciones al formato esperado
      const route = ubicacionesOrdenadas.map(
        (ubicacion: any, index: number) => {
          const fecha = new Date(ubicacion.fechaRegistro);
          const fechaFormateada = fecha.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          // La última ubicación es "current", las anteriores son "completed"
          let status: "completed" | "current" | "pending" = "completed";
          if (index === ubicacionesOrdenadas.length - 1) {
            // Si el paquete está entregado, marcamos como completed
            const estadoLower =
              paquete.estadoActual?.toLowerCase() ||
              paquete.estado?.toLowerCase() ||
              "";
            if (estadoLower === "entregado") {
              status = "completed";
            } else {
              status = "current";
            }
          }

          return {
            location: ubicacion.ubicacion,
            date: fechaFormateada,
            status: status,
          };
        }
      );

      // Formatear fecha de última actualización
      const ultimaUbicacion =
        ubicacionesOrdenadas[ubicacionesOrdenadas.length - 1];
      const lastUpdate = ultimaUbicacion
        ? new Date(ultimaUbicacion.fechaRegistro).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : new Date().toLocaleDateString("es-ES");

      // Determinar ubicación actual
      const currentLocation =
        ultimaUbicacion?.ubicacion || "Sin ubicación registrada";

      // Determinar origen y destino del paquete

      const destination =
        paquete.destino || paquete.destinatario || "Destino no especificado";

      // Determinar estado
      const estadoLower =
        paquete.estadoActual?.toLowerCase() ||
        paquete.estado?.toLowerCase() ||
        "";
      let status = "En tránsito";
      if (estadoLower === "entregado") {
        status = "Entregado";
      } else if (estadoLower === "en bodega") {
        status = "En bodega";
      } else if (estadoLower === "en ruta") {
        status = "En tránsito";
      }

      // Obtener información del remitente y destinatario
      const remitente = paquete.remitente || "No especificado";
      const destinatario = paquete.destinatario || "No especificado";

      // Configurar datos de rastreo
      setTrackingData({
        guideNumber: paquete.codigoPaquete || paquete.codigo || trackingNumber,
        origin: origin,
        destination: destination,
        remitente: remitente,
        destinatario: destinatario,
        currentLocation: currentLocation,
        weight: paquete.peso || "No especificado",
        dimensions: paquete.dimensiones || "No especificado",
        lastUpdate: lastUpdate,
        status: status,
        news: paquete.novedades || "No se han registrado novedades",
        route: route,
      });
    } catch (error) {
      console.error("Error al buscar paquete:", error);
      setShowNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

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
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="h-12 px-8 bg-slate-700 hover:bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-6 -mt-8">
        {isLoading ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Buscando información del paquete...
              </h3>
            </CardContent>
          </Card>
        ) : (
          trackingData && (
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
                            <p className="text-sm text-gray-600">Destino</p>
                            <p className="font-medium">
                              {trackingData.destination}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Ubicación Actual
                            </p>
                            <p className="font-medium text-blue-600">
                              {trackingData.currentLocation}
                            </p>
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
                            <p className="text-sm text-gray-600">Remitente</p>
                            <p className="font-medium">
                              {trackingData.remitente}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Destinatario
                            </p>
                            <p className="font-medium">
                              {trackingData.destinatario}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Peso</p>
                            <p className="font-medium">{trackingData.weight}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Dimensiones</p>
                            <p className="font-medium">
                              {trackingData.dimensions}
                            </p>
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
                            {index < trackingData.route.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200 mt-1" />
                            )}
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
          )
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
  );
}
