import axios from 'axios'
import {SIGN_IN_URL} from '@/lib/apiUrls'

export interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

let currentUser: User | null = null

export async function getUser(): Promise<User | null> {
  return currentUser
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(SIGN_IN_URL(), { email, password })
    response.data.message = '로그인이 완료되었습니다.'
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '로그인 요청 중 오류가 발생했습니다.'
    )
  }
}

export const logout = async (email: string) => {
  try {
    const response = await axios.post(SIGN_IN_URL(), { email })
    response.data.message = '로그아웃이 완료되었습니다.'
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '로그아웃 요청 중 오류가 발생했습니다.'
    )
  }
}