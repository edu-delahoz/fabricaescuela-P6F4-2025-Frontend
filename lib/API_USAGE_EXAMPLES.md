# Ejemplos de Uso del Cliente API

Este documento muestra cómo usar los servicios de autenticación y el cliente HTTP para interactuar con los endpoints.

## Autenticación

### Login

El login se maneja automáticamente en el componente de login, pero aquí está cómo funciona internamente:

```typescript
import { AuthService } from "@/lib/auth"

// En un componente o función
const handleLogin = async () => {
  try {
    const response = await AuthService.login({
      username: "usuario@ejemplo.com",
      password: "password123"
    })
    
    // Los tokens se guardan automáticamente en localStorage
    // response contiene: { access_token, refresh_token, role, permissions }
    console.log("Rol:", response.role)
    console.log("Permisos:", response.permissions)
    
    // Redirigir al dashboard o página principal
    router.push("/dashboard")
  } catch (error) {
    console.error("Error en login:", error)
  }
}
```

### Obtener información del usuario autenticado

```typescript
import { AuthService } from "@/lib/auth"

// Verificar si está autenticado
if (AuthService.isAuthenticated()) {
  const role = AuthService.getUserRole()
  const permissions = AuthService.getUserPermissions()
  console.log("Usuario autenticado con rol:", role)
}

// Obtener tokens directamente
const accessToken = AuthService.getAccessToken()
const refreshToken = AuthService.getRefreshToken()
```

### Logout

```typescript
import { AuthService } from "@/lib/auth"

const handleLogout = async () => {
  await AuthService.logout()
  // Limpia los tokens y redirige al login
  router.push("/login")
}
```

## Cliente API - Servicios de Paquetes

### Obtener todos los paquetes

```typescript
import { packageService } from "@/lib/api-client"

// En un componente
const [paquetes, setPaquetes] = useState([])

useEffect(() => {
  const fetchPaquetes = async () => {
    try {
      const data = await packageService.getAll()
      setPaquetes(data)
    } catch (error) {
      console.error("Error al obtener paquetes:", error)
    }
  }
  
  fetchPaquetes()
}, [])
```

### Obtener un paquete específico

```typescript
import { packageService } from "@/lib/api-client"

const fetchPaquete = async (codigo: string) => {
  try {
    const paquete = await packageService.getByCode(codigo)
    console.log("Paquete:", paquete)
    return paquete
  } catch (error) {
    console.error("Error:", error)
  }
}
```

### Obtener paquetes en ruta

```typescript
import { packageService } from "@/lib/api-client"

// Obtener todos los paquetes en ruta
const paquetesEnRuta = await packageService.getEnRuta()

// Obtener un paquete específico en ruta
const paquete = await packageService.getEnRuta("ABC123")
```

### Actualizar dirección de un paquete en ruta

```typescript
import { packageService } from "@/lib/api-client"

const updateDireccion = async () => {
  try {
    await packageService.updateDireccion("ABC123", {
      direccion: "Nueva dirección 123",
      destinatario: "Juan Pérez"
    })
    console.log("Dirección actualizada exitosamente")
  } catch (error) {
    console.error("Error al actualizar dirección:", error)
  }
}
```

### Registrar nueva ubicación

```typescript
import { packageService } from "@/lib/api-client"

const registrarUbicacion = async () => {
  try {
    await packageService.registrarUbicacion("ABC123", {
      ubicacion: "Centro de Distribución Bogotá",
      latitud: 4.6097,
      longitud: -74.0817
    })
    console.log("Ubicación registrada exitosamente")
  } catch (error) {
    console.error("Error:", error)
  }
}
```

### Obtener historial de ubicaciones

```typescript
import { packageService } from "@/lib/api-client"

// Obtener todas las ubicaciones de un paquete
const ubicaciones = await packageService.getUbicaciones("ABC123")

// Obtener solo la última ubicación
const ultimaUbicacion = await packageService.getUltimaUbicacion("ABC123")
```

## Servicio de Novedades

### Crear una novedad

```typescript
import { novedadService } from "@/lib/api-client"

const crearNovedad = async () => {
  try {
    await novedadService.create({
      codigoPaquete: "ABC123",
      descripcion: "Retraso en la entrega debido a condiciones climáticas",
      tipo: "Retraso"
    })
    console.log("Novedad creada exitosamente")
  } catch (error) {
    console.error("Error:", error)
  }
}
```

### Obtener novedades

```typescript
import { novedadService } from "@/lib/api-client"

// Obtener todas las novedades
const todasLasNovedades = await novedadService.getAll()

// Obtener novedades de un paquete específico
const novedadesPaquete = await novedadService.getByPaquete("ABC123")
```

## Cliente API Genérico

Si necesitas hacer peticiones a endpoints que no están en los servicios predefinidos:

```typescript
import { apiClient } from "@/lib/api-client"

// GET request
const data = await apiClient.get<any>("/endpoint/personalizado")

// POST request
const result = await apiClient.post<any>("/endpoint/personalizado", {
  campo1: "valor1",
  campo2: "valor2"
})

// PUT request
await apiClient.put<any>("/endpoint/personalizado/123", {
  campo: "nuevo valor"
})

// DELETE request
await apiClient.delete<any>("/endpoint/personalizado/123")
```

**Nota importante:** El cliente API automáticamente:
- Incluye el token de autenticación en el header `Authorization: Bearer {token}`
- Intenta renovar el token si expira (401)
- Redirige al login si no se puede renovar el token

## Ejemplo Completo: Componente React

```typescript
"use client"

import { useState, useEffect } from "react"
import { packageService } from "@/lib/api-client"
import { AuthService } from "@/lib/auth"

export default function PaquetesPage() {
  const [paquetes, setPaquetes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPaquetes = async () => {
      // Verificar autenticación
      if (!AuthService.isAuthenticated()) {
        setError("Debes iniciar sesión para ver los paquetes")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await packageService.getAll()
        setPaquetes(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar paquetes")
      } finally {
        setLoading(false)
      }
    }

    fetchPaquetes()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Paquetes</h1>
      {paquetes.map((paquete) => (
        <div key={paquete.codigo}>
          {/* Renderizar información del paquete */}
        </div>
      ))}
    </div>
  )
}
```

