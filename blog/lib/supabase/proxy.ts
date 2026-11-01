import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** 세션 쿠키를 갱신하고 로그인 여부를 돌려준다. 갱신된 쿠키는 response에 담겨 있다. */
export async function updateSession (request: NextRequest) {
	let response = NextResponse.next({ request })
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll () {
					return request.cookies.getAll()
				},
				setAll (cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
					response = NextResponse.next({ request })
					cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
				},
			},
		},
	)
	const { data } = await supabase.auth.getClaims()
	return { response, isAuthenticated: Boolean(data?.claims) }
}
