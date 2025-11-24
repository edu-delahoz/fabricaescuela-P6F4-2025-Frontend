"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useHighContrast } from "@/components/providers/high-contrast-provider";

type HighContrastToggleProps = {
  className?: string;
};

export function HighContrastToggle({ className }: HighContrastToggleProps) {
  const { isHighContrast, toggleHighContrast } = useHighContrast();

  return (
    <div
      className={cn(
        "high-contrast-toggle flex items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-lg backdrop-blur",
        isHighContrast && "high-contrast-toggle--active",
        className
      )}
    >
      <Switch
        checked={isHighContrast}
        onCheckedChange={toggleHighContrast}
        className="high-contrast-switch data-[state=checked]:bg-[#f5c400] data-[state=unchecked]:bg-gray-400 h-6 w-12"
      />
      <span>Alto Contraste</span>
    </div>
  );
}
