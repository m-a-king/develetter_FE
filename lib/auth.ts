import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import axios from 'axios'
import { SIGN_IN_URL } from '@/lib/apiUrls'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const response = await axios.post(SIGN_IN_URL(), {
          email: credentials?.email,
          password: credentials?.password
        })

        const user = response.data.user
        const token = response.data.token

        if (user && token) {
          return { ...user, token }
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용
    maxAge: 60 * 60 * 24 // 세션 만료 시간(sec)
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      return token
    },
    session: async ({ session, token }) => {
      return session
    }
  }
})
