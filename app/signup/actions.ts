import axios from 'axios'
import {
  EMAIL_CERTIFICATION_URL,
  CHECK_CERTIFICATION_URL,
  SIGN_UP_URL
} from '@/lib/apiUrls'

export const verifyEmail = async (email: string) => {
  try {
    const response = await axios.post(EMAIL_CERTIFICATION_URL(), { email })
    response.data.message = '이메일로 인증번호가 발송되었습니다.'
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        '이메일 인증 요청 중 오류가 발생했습니다.'
    )
  }
}

export const verifyCode = async (email: string, verificationCode: number) => {
  try {
    const response = await axios.post(CHECK_CERTIFICATION_URL(), {
      email,
      verificationCode
    })
    response.data.message = '인증번호가 확인되었습니다.'
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '인증번호 확인 중 오류가 발생했습니다.'
    )
  }
}

export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(SIGN_UP_URL(), { email, password })
    response.data.message = '회원가입이 완료되었습니다.'
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '회원가입 요청 중 오류가 발생했습니다.'
    )
  }
}
