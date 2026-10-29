import type { Metadata } from 'next'
import { LoginForm } from './login-form'

export const metadata: Metadata = { title: '관리자 로그인', robots: { index: false, follow: false } }

export default function LoginPage () {
	return (
		<main className="mx-auto max-w-md px-6 py-24 lg:py-36">
			<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">관리자</p>
			<h1 className="text-5xl font-medium tracking-[-0.06em]">로그인</h1>
			<LoginForm />
		</main>
	)
}
