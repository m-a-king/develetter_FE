import { signIn } from 'next-auth/react'
import { AuthError } from 'next-auth'

export async function login(email: string, password: string) {
  try {
    await signIn('credentials', {
      redirect: true,
      email,
      password
    })
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error('로그인 요청 중 오류가 발생했습니다.')
    }
    throw error
  }
}
