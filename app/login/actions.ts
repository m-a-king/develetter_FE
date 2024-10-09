import { auth } from '@/lib/auth'

export interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

export async function getUser(): Promise<User | null> {
  const session = await auth()
  return session?.user || null
}