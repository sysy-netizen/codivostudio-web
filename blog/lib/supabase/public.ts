import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * 쿠키를 쓰지 않는 읽기 전용 클라이언트. 공개된 글만 RLS로 조회된다.
 * generateStaticParams나 정적/ISR 페이지처럼 요청 컨텍스트가 없는 곳에서 쓴다.
 */
export function createPublicClient () {
	return createSupabaseClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{ auth: { persistSession: false, autoRefreshToken: false } },
	)
}
