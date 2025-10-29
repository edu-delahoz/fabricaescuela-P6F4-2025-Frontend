"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package } from "lucide-react"
import { ConfirmationModal } from "@/components/modals/confirmation-modal"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación de validación - aquí iría la lógica real de autenticación
    if (!email || !password) {
      setShowError(true)
      return
    }

    // Por ahora, cualquier intento muestra el error para demostrar la funcionalidad
    setShowError(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Panel izquierdo - Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Logo y título */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CourierSync</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Inicia sesión</h2>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11"
              />
            </div>

            {/* Botón de inicio de sesión */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white font-medium text-base"
            >
              Iniciar sesión
            </Button>
          </form>
        </div>

        {/* Panel derecho - Bienvenida */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 flex flex-col justify-center items-center text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Bienvenido!</h2>
            <p className="text-lg leading-relaxed mb-8">
              Ingresa tus credenciales
              <br />
              para iniciar sesión
            </p>
            {/* Decoración con chevrones */}
            <div className="flex justify-center gap-3 text-blue-300 opacity-50">
              <span className="text-3xl">«</span>
              <span className="text-3xl">«</span>
              <span className="text-3xl">«</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de error */}
      <ConfirmationModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Error"
        message="Usuario o contraseña inválidos, intenta de nuevo"
        type="error"
      />
    </div>
  )
}
