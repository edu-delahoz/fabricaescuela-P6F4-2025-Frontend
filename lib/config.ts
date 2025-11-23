/**
 * Configuración de las URLs base de los servicios
 */
export const API_CONFIG = {
  AUTH_BASE_URL: "https://fabricaescuela-p6f4-backend.onrender.com/api",
  INVENTORY_BASE_URL: "https://fabricaescuela-p6f4-inventary-service.onrender.com/api",
} as const;

/**
 * Claves para almacenamiento local
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_ROLE: "user_role",
  USER_PERMISSIONS: "user_permissions",
} as const;

