import { API_CONFIG, STORAGE_KEYS } from "./config";

export interface LoginResponse {
  token: string;
  refreshToken: string;
  role: string;
  permisos: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Servicio de autenticación
 */
export class AuthService {
  /**
   * Iniciar sesión
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_CONFIG.AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Error al iniciar sesión");
    }

    const data: LoginResponse = await response.json();
    
    // Guardar tokens y datos del usuario
    this.saveAuthData(data);
    
    return data;
  }

  /**
   * Guardar datos de autenticación en localStorage
   */
  static saveAuthData(data: LoginResponse): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, data.role);
      localStorage.setItem(STORAGE_KEYS.USER_PERMISSIONS, JSON.stringify(data.permisos));
    }
  }

  /**
   * Obtener el token de acceso
   */
  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Obtener el refresh token
   */
  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Obtener el rol del usuario
   */
  static getUserRole(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE);
  }

  /**
   * Obtener los permisos del usuario
   */
  static getUserPermissions(): string[] {
    if (typeof window === "undefined") return [];
    const permissions = localStorage.getItem(STORAGE_KEYS.USER_PERMISSIONS);
    return permissions ? JSON.parse(permissions) : [];
  }

  /**
   * Verificar si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  /**
   * Cerrar sesión
   */
  static async logout(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    
    // Intentar revocar el refresh token en el servidor
    if (refreshToken) {
      try {
        await fetch(`${API_CONFIG.AUTH_BASE_URL}/login/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch (error) {
        console.error("Error al cerrar sesión en el servidor:", error);
      }
    }

    // Limpiar datos locales
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
      localStorage.removeItem(STORAGE_KEYS.USER_PERMISSIONS);
    }
  }

  /**
   * Renovar token usando el refresh token
   */
  static async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${API_CONFIG.AUTH_BASE_URL}/login/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        // Si el refresh token es inválido, hacer logout
        await this.logout();
        return null;
      }

      const data = await response.json();
      const newAccessToken = data.access_token || data.token;
      
      if (newAccessToken) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
        return newAccessToken;
      }

      return null;
    } catch (error) {
      console.error("Error al renovar token:", error);
      await this.logout();
      return null;
    }
  }
}

