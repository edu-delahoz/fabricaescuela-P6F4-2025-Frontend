"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";
import { packageService } from "@/lib/api-client";
import { AuthService } from "@/lib/auth";

interface Shipment {
  id: string;
  codigoPaquete: string;
  remitente: string;
  destinatario: string;
  destino: string;
  ubicacion: string;
  fechaRegistro: string;
  estadoActual: "en ruta" | "en bodega" | "entregado";
}

export default function ManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("¡Ha ocurrido un error!");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Cargar paquetes al montar el componente
  useEffect(() => {
    loadPaquetes();
  }, []);

  const loadPaquetes = async () => {
    // Verificar autenticación
    if (!AuthService.isAuthenticated()) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const paquetes = await packageService.getAll();

      // Mapear los datos del backend al formato de la interfaz
      const mappedShipments: Shipment[] = paquetes.map((paquete: any) => {
        // Normalizar el estado según lo que devuelva el backend
        let estadoActual: "en ruta" | "en bodega" | "entregado" = "en bodega";
        if (paquete.estadoActual) {
          const estadoLower = paquete.estadoActual.toLowerCase();
          if (estadoLower.includes("ruta") || estadoLower === "en ruta") {
            estadoActual = "en ruta";
          } else if (
            estadoLower.includes("entregado") ||
            estadoLower === "entregado"
          ) {
            estadoActual = "entregado";
          } else {
            estadoActual = "en bodega";
          }
        } else if (paquete.estado) {
          const estadoLower = paquete.estado.toLowerCase();
          if (estadoLower.includes("ruta") || estadoLower === "en ruta") {
            estadoActual = "en ruta";
          } else if (
            estadoLower.includes("entregado") ||
            estadoLower === "entregado"
          ) {
            estadoActual = "entregado";
          } else {
            estadoActual = "en bodega";
          }
        }

        return {
          id: paquete.id?.toString() || "",
          codigoPaquete:
            paquete.codigoPaquete ||
            paquete.codigo ||
            paquete.id?.toString() ||
            "",
          remitente: paquete.remitente || "",
          destinatario: paquete.destinatario || "",
          destino: paquete.destino || "",
          ubicacion: paquete.ubicacion || "",
          fechaRegistro:
            paquete.fechaRegistro ||
            paquete.fechaCreacion ||
            new Date().toISOString(),
          estadoActual: estadoActual,
        };
      });

      setShipments(mappedShipments);
      setErrorMessage("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al cargar los paquetes";
      setErrorMessage(message);
      setShowError(true);
      console.error("Error al cargar paquetes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // Si no hay término de búsqueda, cargar todos los paquetes
      loadPaquetes();
      return;
    }

    setIsSearching(true);
    try {
      // Buscar por código de paquete
      const paquete = await packageService.getByCode(searchTerm.trim());

      if (paquete) {
        // Normalizar el estado
        let estadoActual: "en ruta" | "en bodega" | "entregado" = "en bodega";
        if (paquete.estadoActual) {
          const estadoLower = paquete.estadoActual.toLowerCase();
          if (estadoLower.includes("ruta") || estadoLower === "en ruta") {
            estadoActual = "en ruta";
          } else if (
            estadoLower.includes("entregado") ||
            estadoLower === "entregado"
          ) {
            estadoActual = "entregado";
          } else {
            estadoActual = "en bodega";
          }
        } else if (paquete.estado) {
          const estadoLower = paquete.estado.toLowerCase();
          if (estadoLower.includes("ruta") || estadoLower === "en ruta") {
            estadoActual = "en ruta";
          } else if (
            estadoLower.includes("entregado") ||
            estadoLower === "entregado"
          ) {
            estadoActual = "entregado";
          } else {
            estadoActual = "en bodega";
          }
        }

        const mappedShipment: Shipment = {
          id: paquete.id?.toString() || "",
          codigoPaquete:
            paquete.codigoPaquete ||
            paquete.codigo ||
            paquete.id?.toString() ||
            "",
          remitente: paquete.remitente || "",
          destinatario: paquete.destinatario || "",
          destino: paquete.destino || "",
          ubicacion: paquete.ubicacion || "",
          fechaRegistro:
            paquete.fechaRegistro ||
            paquete.fechaCreacion ||
            new Date().toISOString(),
          estadoActual: estadoActual,
        };

        setShipments([mappedShipment]);
      } else {
        setShipments([]);
      }
    } catch (error) {
      // Si no se encuentra, mostrar array vacío
      setShipments([]);
      console.error("Error al buscar paquete:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (estado: string) => {
    const estadoLower = estado.toLowerCase();
    if (estadoLower === "en ruta") {
      return "bg-red-100 text-red-800 border-red-200";
    } else if (estadoLower === "en bodega") {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (estadoLower === "entregado") {
      return "bg-green-100 text-green-800 border-green-200";
    }
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatStatus = (estado: string) => {
    const estadoLower = estado.toLowerCase();
    if (estadoLower === "en ruta") return "En Ruta";
    if (estadoLower === "en bodega") return "En Bodega";
    if (estadoLower === "entregado") return "Entregado";
    return estado;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("es-ES");
    } catch {
      return dateString;
    }
  };

  const filteredShipments =
    searchTerm.trim() && !isSearching
      ? shipments.filter((shipment) =>
          shipment.codigoPaquete
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : shipments;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-wide">
            GESTIÓN DE PAQUETES
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">
                Barra de búsqueda
              </h2>
              <div className="flex max-w-2xl mx-auto gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Ingresa el número de guía"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button
                  className="h-12 px-8 bg-slate-700 hover:bg-slate-800 text-white"
                  onClick={handleSearch}
                  disabled={isSearching || isLoading}
                >
                  {isSearching ? "Buscando..." : "Buscar"}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cargando paquetes...
                  </h3>
                </div>
              ) : filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <div
                    key={shipment.codigoPaquete}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold">
                            {shipment.codigoPaquete}
                          </p>
                          <Badge
                            className={`${getStatusColor(
                              shipment.estadoActual
                            )} border`}
                          >
                            {formatStatus(shipment.estadoActual)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Fecha de registro:{" "}
                          {formatDate(shipment.fechaRegistro)}
                        </p>
                        {shipment.destino && (
                          <p className="text-sm text-gray-500">
                            Destino: {shipment.destino}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() =>
                          router.push(`/gestion/${shipment.codigoPaquete}`)
                        }
                      >
                        Consultar
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() =>
                          router.push(
                            `/gestion/${shipment.codigoPaquete}/editar`
                          )
                        }
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No se encontraron paquetes
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm
                      ? `No se encontraron paquetes que coincidan con "${searchTerm}"`
                      : "No hay paquetes disponibles en este momento"}
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-gray-500">
                      Intenta buscar por número de guía
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Link href="/">
                <Button
                  variant="outline"
                  className="px-8 bg-gray-200 hover:bg-gray-300"
                >
                  Salir
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
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
        message={errorMessage}
        type="error"
      />
    </div>
  );
}
