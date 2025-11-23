"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Package,
  Settings,
  LayoutDashboard,
  Archive,
  LogOut,
} from "lucide-react";
import { AuthService } from "@/lib/auth";

export function NavHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await AuthService.logout();
    router.push("/login");
  };

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
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
