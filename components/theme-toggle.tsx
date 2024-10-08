'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/lib/hooks/use-theme'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [_, startTransition] = React.useTransition()

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    })
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Moon className="size-5 transition-all" />
      ) : (
        <Sun className="size-5 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
