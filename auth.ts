import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import type { Provider } from 'next-auth/providers'
import type { AdapterUser } from 'next-auth/adapters'

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    authorize: async (credentials) => {
      // const res = await axios.post(SIGN_IN_URL(), {
      //     email: credentials?.email,
      //     password: credentials?.password,
      // })
      // const user = res.data
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    }
  }),
  GitHub,
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        user.token = '123456789'
        user.subscriptions = {
          jobNames: [],
          locationNames: [],
          jobTypeNames: [],
          industryNames: [],
          educationLevelNames: [],
          blogKeywords: []
        }
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as AdapterUser
      return session
    },
  }
})