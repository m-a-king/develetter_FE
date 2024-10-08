import axios from 'axios'
import { SIGN_UP_URL } from '@/lib/apiUrls'

export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(SIGN_UP_URL(), { email, password })
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '회원가입 요청 중 오류가 발생했습니다.'
    )
  }
}
