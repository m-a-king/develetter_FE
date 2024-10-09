'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Session } from 'next-auth'
import { auth } from 'lib/auth'

const SessionContent = createContext<Session | null>(null)

export const SessionProvider = ({
                                  children
                                }: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    auth().then(res => {
      setSession(res)
    })
  }, [pathname])
  return (
    <SessionContent.Provider value={session}>
      {children}
    </SessionContent.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionContent)
}