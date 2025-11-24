import { API_CONFIG } from "./config";
import { AuthService } from "./auth";

/**
 * Cliente HTTP para hacer peticiones autenticadas al servicio de inventario
 */
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_CONFIG.INVENTORY_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Realizar una petición autenticada.
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = AuthService.getAccessToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as any)["Authorization"] = `Bearer ${token}`;
    }

    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseURL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      const newToken = await AuthService.refreshAccessToken();

      if (newToken) {
        (headers as any)["Authorization"] = `Bearer ${newToken}`;
        const retryResponse = await fetch(url, {
          ...options,
          headers,
        });

        if (!retryResponse.ok) {
          throw new Error(`Error ${retryResponse.status}: ${retryResponse.statusText}`);
        }

        return retryResponse.json();
      } else {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
    }

    // Si la respuesta no tiene contenido, retornar null
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null as T;
    }

    return response.json();
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

/**
 * Instancia singleton del cliente API
 */
export const apiClient = new ApiClient();

/**
 * Servicios específicos para los endpoints de paquetes
 */
export const packageService = {
  /**
   * Obtener todos los paquetes
   */
  getAll: () => apiClient.get<any[]>("/paquetes"),

  /**
   * Obtener un paquete por código
   */
  getByCode: (codigo: string) => apiClient.get<any>(`/paquetes/${codigo}`),

  /**
   * Obtener paquetes en ruta
   */
  getEnRuta: (codigo?: string) => {
    if (codigo) {
      return apiClient.get<any>(`/paquetes/en-ruta/${codigo}`);
    }
    return apiClient.get<any[]>("/paquetes/en-transito");
  },

  /**
   * Buscar paquetes por criterios
   */
  search: (criteria: {
    codigoPaquete?: string;
    fechaRegistro?: string;
    nombreEstado?: string;
  }) => {
    const params = new URLSearchParams();
    if (criteria.codigoPaquete) params.append("codigoPaquete", criteria.codigoPaquete);
    if (criteria.fechaRegistro) params.append("fechaRegistro", criteria.fechaRegistro);
    if (criteria.nombreEstado) params.append("nombreEstado", criteria.nombreEstado);
    return apiClient.get<any>(`/paquetes/buscar?${params.toString()}`);
  },

  /**
   * Actualizar dirección de un paquete en ruta
   */
  updateDireccion: (codigo: string, data: {
    destino?: string;
    destinatario?: string;
  }) => apiClient.put<any>(`/paquetes/en-ruta/${codigo}/direccion`, data),

  /**
   * Registrar nueva ubicación
   */
  registrarUbicacion: (codigoPaquete: string, data: {
    ubicacion: string;
    latitud?: number;
    longitud?: number;
  }) => apiClient.post<any>(`/paquetes/${codigoPaquete}/ubicaciones`, data),

  /**
   * Obtener historial de ubicaciones
   */
  getUbicaciones: (codigoPaquete: string) =>
    apiClient.get<any[]>(`/paquetes/${codigoPaquete}/ubicaciones`),

  /**
   * Obtener última ubicación
   */
  getUltimaUbicacion: (codigoPaquete: string) =>
    apiClient.get<any>(`/paquetes/${codigoPaquete}/ubicaciones/ultima`),
};


/**
 * Servicio para novedades
 */
export const novedadService = {
  getAll: () => apiClient.get<any[]>("/novedades"),

  getById: (id: number) => apiClient.get<any>(`/novedades/${id}`),


  create: (data: {
    idPaquete: number;
    descripcion: string;
    tipoNovedad: string;
    fechaHora: string;
  }) => apiClient.post<any>("/novedades", {
    idPaquete: { id: data.idPaquete },
    tipoNovedad: data.tipoNovedad,
    descripcion: data.descripcion,
    fechaHora: data.fechaHora
  }),


  update: (id: number, data: any) => apiClient.put<any>(`/novedades/${id}`, data),

  /**
   * Eliminar una novedad
   */
  delete: (id: number) => apiClient.delete<void>(`/novedades/${id}`),

  /**
   * Obtener novedades de un paquete
   */
  getByPaquete: (idPaquete: number) =>
    apiClient.get<any[]>(`/novedades/paquete/${idPaquete}`),
};

export const estadoService = {
  getAll: () => apiClient.get<any[]>("/estados"),
  getById: (id: number) => apiClient.get<any>(`/estados/${id}`),
  create: (data: any) => apiClient.post<any>("/estados", data),
  update: (id: number, data: any) => apiClient.put<any>(`/estados/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/estados/${id}`),
};

/**
 * Servicio para historial de estados
 */
export const historialEstadoService = {
  getAll: () => apiClient.get<any[]>("/historial-estados"),
  getById: (id: number) => apiClient.get<any>(`/historial-estados/${id}`),
  getByPaquete: (idPaquete: number) => apiClient.get<any[]>(`/historial-estados/paquete/${idPaquete}`),
  create: (data: {
    idPaquete: number;
    idEstado: number;
    idEmpleado: number;
    fechaHora: string;
  }) => apiClient.post<any>("/historial-estados", {
    idPaquete: { id: data.idPaquete },
    idEstado: { id: data.idEstado },
    idEmpleado: { id: data.idEmpleado },
    fechaHora: data.fechaHora
  }),
  update: (id: number, data: any) => apiClient.put<any>(`/historial-estados/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/historial-estados/${id}`),
};
