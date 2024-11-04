import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const session = await auth()

    if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!session && (request.nextUrl.pathname === '/mypage' || request.nextUrl.pathname === '/mypage/subscribe')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/mypage', '/mypage/subscribe', '/login', '/signup'],
};