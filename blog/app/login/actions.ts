'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
	SESSION_COOKIE,
	SESSION_MAX_AGE,
	createSessionToken,
	isPasswordValid,
} from '@/lib/auth'

export interface LoginState {
	error?: string
}

export async function login (_state: LoginState, formData: FormData): Promise<LoginState> {
	const password = String(formData.get('password') ?? '')
	const token = await createSessionToken()
	if (!token || !process.env.ADMIN_PASSWORD) {
		return { error: '서버에 관리자 설정(ADMIN_PASSWORD, SESSION_SECRET)이 없습니다.' }
	}
	if (!isPasswordValid(password)) {
		return { error: '비밀번호가 올바르지 않습니다.' }
	}
	const cookieStore = await cookies()
	cookieStore.set(SESSION_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: SESSION_MAX_AGE,
		path: '/',
	})
	redirect('/admin')
}

export async function logout () {
	const cookieStore = await cookies()
	cookieStore.delete(SESSION_COOKIE)
	redirect('/login')
}
