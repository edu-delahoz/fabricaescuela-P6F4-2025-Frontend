import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Settings, LayoutDashboard, Archive } from "lucide-react"

export function NavHeader() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CourierSync</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Rastrear Envío
              </Button>
            </Link>
            <Link href="/gestion">
              <Button variant="ghost" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Gestión de Estados
              </Button>
            </Link>
            <Link href="/inventario">
              <Button variant="ghost" className="flex items-center gap-2">
                <Archive className="h-4 w-4" />
                Inventario
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
