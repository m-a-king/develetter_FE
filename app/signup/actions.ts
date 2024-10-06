export async function signup(email: string, password: string) {
  return new Promise<{ success: boolean; message?: string }>(resolve => {
    setTimeout(() => {
      if (email === 'existing@example.com') {
        resolve({ success: false, message: '이미 존재하는 이메일입니다.' })
      } else {
        resolve({ success: true, message: '회원가입이 완료되었습니다.' })
      }
    }, 1000)
  })
}
