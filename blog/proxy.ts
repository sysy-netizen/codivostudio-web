import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy (request: NextRequest) {
	const { response, isAuthenticated } = await updateSession(request)
	if (isAuthenticated) {
		return response
	}
	return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
	matcher: '/admin/:path*',
}
