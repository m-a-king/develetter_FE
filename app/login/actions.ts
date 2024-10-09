import axios from 'axios'
import Cookies from 'js-cookie'
import { SIGN_IN_URL, SIGN_OUT_URL } from '@/lib/apiUrls'

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(SIGN_IN_URL(), { email, password })
    const { token, expirationTime } = response.data

    // 현재 시간 (밀리초 단위) 계산 및 만료 시간 설정
    const now = new Date().getTime()
    const expires = new Date(now + expirationTime * 1000)

    // 쿠키에 accessToken 설정
    Cookies.set('accessToken', token, { expires, path: '/' })
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '로그인 요청 중 오류가 발생했습니다.'
    )
  }
}

export const logout = async (accessToken: string) => {
  try {
    await axios.post(SIGN_OUT_URL(), { accessToken })

    // 쿠키에서 accessToken 삭제
    Cookies.remove('accessToken', { path: '/' })
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '로그아웃 요청 중 오류가 발생했습니다.'
    )
  }
}
