'use client'

import { createContext, useContext, useState, ReactNode } from "react"
import { OAuthModal } from "@/components/OAuthModal"

interface OAuthContextProps {
  openModal: () => void
  closeModal: () => void
}

const OAuthContext = createContext<OAuthContextProps | undefined>(undefined)

export function OAuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <OAuthContext.Provider value={{ openModal, closeModal }}>
      {children}
      <OAuthModal isOpen={isOpen} onClose={closeModal} />
    </OAuthContext.Provider>
  )
}

export function useOAuth() {
  const context = useContext(OAuthContext)
  if (!context) {
    throw new Error("useOAuth must be used within an OAuthProvider")
  }
  return context
}
