"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left side - Menu */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-12 flex flex-col items-center justify-center gap-8">
            {/* Package Icon */}
            <div className="w-24 h-24 border-4 border-white rounded-lg flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>

            {/* Menu Buttons */}
            <div className="w-full max-w-xs space-y-4">
              <Link href="/gestion" className="block">
                <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 h-12 text-base font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Gestión de Paquetes
                </Button>
              </Link>

              <Link href="/reporte-incidencias" className="block">
                <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 h-12 text-base font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Reporte de Incidencias
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Welcome message */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-12 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Bienvenido!</h1>
            <h2 className="text-xl font-semibold mb-6 tracking-wide">AUXLIAR LOGÍSTICO</h2>
            <p className="text-blue-100 leading-relaxed max-w-sm">
              Gestiona y mantén actualizada la información de los distintos paquetes que se encuentran en tránsito
            </p>
            <div className="mt-8 flex gap-3 text-blue-300">
              <span className="text-2xl">«</span>
              <span className="text-2xl">«</span>
              <span className="text-2xl">«</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
