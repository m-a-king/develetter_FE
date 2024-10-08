'use client'

import * as React from 'react'
import { useSyncExternalStore } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()

  const getSnapshot = React.useCallback(() => {
    if (typeof window === 'undefined') return 'light'
    return theme || systemTheme || 'light'
  }, [theme, systemTheme])

  const subscribe = React.useCallback((callback: () => void) => {
    const handler = () => callback()
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const currentTheme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => 'light'
  )

  return {
    theme: currentTheme,
    setTheme
  }
}
