"use client"

import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  message: string
  type?: "success" | "error" | "warning"
  confirmText?: string
  cancelText?: string
}

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = "success",
  confirmText = "Aceptar",
  cancelText = "Cancelar"
}: ConfirmationModalProps) {
  if (!isOpen) return null

  const buttonColor =
    type === "success"
      ? "bg-blue-600 hover:bg-blue-700"
      : type === "error"
        ? "bg-red-600 hover:bg-red-700"
        : "bg-amber-600 hover:bg-amber-700"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
        <p className="text-center text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          {onConfirm && (
            <Button onClick={onClose} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              {cancelText}
            </Button>
          )}
          <Button 
            onClick={onConfirm ? onConfirm : onClose} 
            className={`${buttonColor} text-white px-8`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
