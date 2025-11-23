"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { packageService, novedadService } from "@/lib/api-client";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";

export default function ReporteIncidenciasPage() {
  // Search state
  const [searchCode, setSearchCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [paquete, setPaquete] = useState<any>(null);
  const [searchError, setSearchError] = useState("");

  // Form state
  const [tipoNovedad, setTipoNovedad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feedback state
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!searchCode.trim()) return;

    setIsSearching(true);
    setSearchError("");
    setPaquete(null);

    try {
      const data = await packageService.getByCode(searchCode.trim());
      if (data) {
        setPaquete(data);
      } else {
        setSearchError("No se encontró ningún paquete con ese código.");
      }
    } catch (error) {
      console.error("Error buscando paquete:", error);
      setSearchError("Error al buscar el paquete. Intente nuevamente.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paquete || !tipoNovedad || !descripcion) {
      setErrorMessage("Por favor complete todos los campos obligatorios.");
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await novedadService.create({
        idPaquete: paquete.id,
        tipoNovedad,
        descripcion,
        fechaHora: new Date().toISOString().split('T')[0] // YYYY-MM-DD
      });

      setShowSuccess(true);
      
      // Reset form but keep package selected
      setTipoNovedad("");
      setDescripcion("");
    } catch (error) {
      console.error("Error registrando novedad:", error);
      setErrorMessage("Error al registrar la novedad. Intente nuevamente.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Link>
          <Link href="/reporte-incidencias/historial">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Ver Historial de Incidencias
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-red-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Reporte de Incidencias</h1>
            </div>
            <p className="mt-2 text-red-100">
              Registre novedades o problemas presentados durante el proceso de envío.
            </p>
          </div>

          <div className="p-6 space-y-8">
            {/* Paso 1: Buscar Paquete */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Identificar Paquete
              </h2>
              
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    placeholder="Ingrese el número de guía o código del paquete" 
                    className="pl-10"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  disabled={isSearching || !searchCode.trim()}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  {isSearching ? "Buscando..." : "Buscar"}
                </Button>
              </div>

              {searchError && (
                <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {searchError}
                </div>
              )}

              {paquete && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">Paquete encontrado</h3>
                      <div className="mt-1 text-sm text-blue-800 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                        <p><span className="font-semibold">Código:</span> {paquete.codigoPaquete || paquete.codigo}</p>
                        <p><span className="font-semibold">Estado:</span> {paquete.estadoActual || paquete.estado}</p>
                        <p><span className="font-semibold">Remitente:</span> {paquete.remitente}</p>
                        <p><span className="font-semibold">Destinatario:</span> {paquete.destinatario}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Paso 2: Detalles de la Novedad */}
            <section className={!paquete ? "opacity-50 pointer-events-none" : ""}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Detalles de la Incidencia
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Novedad</Label>
                  <select
                    id="tipo"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={tipoNovedad}
                    onChange={(e) => setTipoNovedad(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un tipo...</option>
                    <option value="retraso">Retraso en la entrega</option>
                    <option value="direccion_incorrecta">Dirección incorrecta</option>
                    <option value="destinatario_ausente">Destinatario ausente</option>
                    <option value="paquete_averiado">Paquete averiado</option>
                    <option value="perdida">Pérdida del paquete</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción Detallada</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describa los detalles de la incidencia..."
                    className="min-h-[120px]"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registrando..." : "Registrar Incidencia"}
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Incidencia Registrada"
        message="La novedad ha sido registrada exitosamente en el sistema."
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
