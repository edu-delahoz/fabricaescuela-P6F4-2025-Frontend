"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { novedadService, packageService } from "@/lib/api-client";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Novedad {
  id: number;
  tipoNovedad: string;
  descripcion: string;
  fechaHora: string;
  idPaquete: number;
  // Optional fields if the backend returns them populated or if we need to fetch them
  codigoPaquete?: string; 
}

export default function HistorialNovedadesPage() {
  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Delete state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchNovedades = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await novedadService.getAll();
      // Sort by date descending (assuming higher ID is newer if date is same)
      const sortedData = data.sort((a: any, b: any) => b.id - a.id);
      setNovedades(sortedData);
    } catch (err) {
      console.error("Error fetching novedades:", err);
      setError("No se pudieron cargar las novedades. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovedades();
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await novedadService.delete(deleteId);
      setShowDeleteConfirm(false);
      setShowSuccess(true);
      fetchNovedades(); // Refresh list
    } catch (err) {
      console.error("Error deleting novedad:", err);
      // Optionally show error modal
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const getTipoLabel = (tipo: string) => {
    const tipos: Record<string, string> = {
      'retraso': 'Retraso en entrega',
      'direccion_incorrecta': 'Dirección incorrecta',
      'destinatario_ausente': 'Destinatario ausente',
      'paquete_averiado': 'Paquete averiado',
      'perdida': 'Pérdida del paquete',
      'otro': 'Otro'
    };
    return tipos[tipo] || tipo;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/reporte-incidencias" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Reportar
          </Link>
          <Button variant="outline" size="sm" onClick={fetchNovedades} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Historial de Incidencias
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Cargando novedades...
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500 bg-red-50 m-4 rounded-lg">
                {error}
              </div>
            ) : novedades.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No hay incidencias registradas.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Fecha</th>
                      <th className="px-6 py-3">Tipo</th>
                      <th className="px-6 py-3">Descripción</th>
                      <th className="px-6 py-3">ID Paquete</th>
                      <th className="px-6 py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {novedades.map((novedad) => (
                      <tr key={novedad.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">#{novedad.id}</td>
                        <td className="px-6 py-4">
                          {novedad.fechaHora ? format(new Date(novedad.fechaHora), "dd MMM yyyy", { locale: es }) : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            {getTipoLabel(novedad.tipoNovedad)}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate" title={novedad.descripcion}>
                          {novedad.descripcion}
                        </td>
                        <td className="px-6 py-4 text-blue-600">
                          {novedad.idPaquete}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteClick(novedad.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Eliminar Incidencia"
        message="¿Estás seguro de que deseas eliminar esta incidencia? Esta acción no se puede deshacer."
        type="warning"
        confirmText={isDeleting ? "Eliminando..." : "Eliminar"}
        cancelText="Cancelar"
      />

      <ConfirmationModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Eliminado"
        message="La incidencia ha sido eliminada correctamente."
        type="success"
      />
    </div>
  );
}
