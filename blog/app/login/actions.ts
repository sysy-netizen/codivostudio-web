'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface LoginState {
	error?: string
}

export async function login (_state: LoginState, formData: FormData): Promise<LoginState> {
	const email = String(formData.get('email') ?? '').trim()
	const password = String(formData.get('password') ?? '')
	if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
		return { error: '서버에 Supabase 설정(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)이 없습니다.' }
	}
	if (!email || !password) {
		return { error: '이메일과 비밀번호를 입력해 주세요.' }
	}
	const supabase = await createClient()
	const { error } = await supabase.auth.signInWithPassword({ email, password })
	if (error) {
		return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
	}
	redirect('/admin')
}

export async function logout () {
	const supabase = await createClient()
	await supabase.auth.signOut()
	redirect('/login')
}
