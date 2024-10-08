// import { auth, signIn, signOut } from '@/lib/auth'

export interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

let currentUser: User | null = null

export async function getUser(): Promise<User | null> {
  return currentUser
}

export async function login(email: string, password: string) {
  if (email === 'test@example.com' && password === 'password') {
    currentUser = { email, name: 'Test User' }
    return { success: true, message: '로그인에 성공하였습니다.' }
  } else {
    return { success: false, message: '이메일 또는 비밀번호가 잘못되었습니다.' }
  }
}

export async function logout() {
  currentUser = null
}

/*
export async function getUser(): Promise<User | null> {
  const session = await auth()
  return session?.user || null
}

export async function login(provider: string, options: { redirectTo: string }) {
  await signIn(provider, options)
}

export async function logout() {
  await signOut()
}
*/
