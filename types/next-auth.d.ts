import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

interface Subscriptions {
    jobNames: string[];
    locationNames: string[];
    jobTypeNames: string[];
    industryNames: string[];
    educationLevelNames: string[];
    blogKeywords: string[];
}

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user?: {
            id?: string
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        token?: string
        subscriptions?: Subscriptions;
    }
}