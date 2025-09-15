"use client"

import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: "success" | "error"
}

export function ConfirmationModal({ isOpen, onClose, title, message, type = "success" }: ConfirmationModalProps) {
  if (!isOpen) return null

  const buttonColor = type === "success" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
        <p className="text-center text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center">
          <Button onClick={onClose} className={`${buttonColor} text-white px-8`}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  )
}
