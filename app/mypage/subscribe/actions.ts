import axios from 'axios'
import { SUBSCRIBE_URL } from '@/lib/apiUrls'

export const subscribe = async (
  accessToken: string,
  items: { [p: string]: string }
) => {
  try {
    console.log(items)
    const response = await axios.post(SUBSCRIBE_URL(), items, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    response.data.message = '구독이 완료되었습니다.'
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '구독 요청 중 오류가 발생했습니다.'
    )
  }
}
