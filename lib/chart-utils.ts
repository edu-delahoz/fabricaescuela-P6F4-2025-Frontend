import type { ChartConfig } from "@/components/ui/chart"

// Chart theme configuration
export const CHART_THEMES = { light: "", dark: ".dark" } as const

export type ChartTheme = keyof typeof CHART_THEMES

/**
 * Helper to extract item config from a chart payload
 */
export function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config]
}

/**
 * Format number for chart display
 */
export function formatChartValue(value: number): string {
  return value.toLocaleString()
}

/**
 * Generate chart styles for themes
 */
export function generateChartStyles(id: string, config: ChartConfig): string {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color)

  if (!colorConfig.length) {
    return ""
  }

  return Object.entries(CHART_THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`,
    )
    .join("\n")
}
