'use client'

import { useActionState } from 'react'
import { login, type LoginState } from './actions'

const initialState: LoginState = {}

export function LoginForm () {
	const [state, formAction, isPending] = useActionState(login, initialState)

	return (
		<form action={formAction} className="mt-10 flex flex-col gap-4">
			<label htmlFor="email" className="text-sm text-black/60">이메일</label>
			<input id="email" name="email" type="email" required autoFocus autoComplete="email" className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />
			<label htmlFor="password" className="text-sm text-black/60">비밀번호</label>
			<input id="password" name="password" type="password" required autoComplete="current-password" className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />
			{state.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
			<button type="submit" disabled={isPending} className="bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50">{isPending ? '확인 중...' : '로그인'}</button>
		</form>
	)
}
