const DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8080'
const API_DOMAIN = `${DOMAIN}/api`

export const SNS_SIGN_IN_URL = (type: 'kakao' | 'naver') =>
  `${API_DOMAIN}/auth/oauth2/${type}`
export const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`
export const SIGN_OUT_URL = () => `${API_DOMAIN}/auth/sign-out`
export const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`
export const EMAIL_CERTIFICATION_URL = () =>
  `${API_DOMAIN}/auth/email-certification`
export const CHECK_CERTIFICATION_URL = () =>
  `${API_DOMAIN}/auth/check-certification`
