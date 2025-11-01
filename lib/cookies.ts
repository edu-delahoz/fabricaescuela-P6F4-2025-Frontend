import { SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE } from "./constants"

/**
 * SSR-safe cookie setter for sidebar state
 */
export function setSidebarCookie(open: boolean): void {
  if (typeof document !== "undefined") {
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }
}

/**
 * SSR-safe cookie getter for sidebar state
 */
export function getSidebarCookie(): boolean | null {
  if (typeof document === "undefined") {
    return null
  }

  const cookies = document.cookie.split("; ")
  const sidebarCookie = cookies.find((cookie) => cookie.startsWith(`${SIDEBAR_COOKIE_NAME}=`))

  if (!sidebarCookie) {
    return null
  }

  const value = sidebarCookie.split("=")[1]
  return value === "true"
}
