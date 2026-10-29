export const SESSION_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

const encoder = new TextEncoder()

async function sign (value: string, secret: string) {
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	)
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
	return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function isEqual (a: string, b: string) {
	if (a.length !== b.length) {
		return false
	}
	let diff = 0
	for (let i = 0; i < a.length; i++) {
		diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
	}
	return diff === 0
}

/** 비밀번호가 ADMIN_PASSWORD와 일치하는지 확인한다. 환경변수가 없으면 항상 실패한다. */
export function isPasswordValid (password: string) {
	const expected = process.env.ADMIN_PASSWORD
	if (!expected || !password) {
		return false
	}
	return isEqual(password, expected)
}

/** 만료 시각이 담긴 서명 토큰을 만든다. SESSION_SECRET이 없으면 null. */
export async function createSessionToken () {
	const secret = process.env.SESSION_SECRET
	if (!secret) {
		return null
	}
	const expiresAt = String(Date.now() + SESSION_MAX_AGE * 1000)
	return `${expiresAt}.${await sign(expiresAt, secret)}`
}

/** 토큰의 서명과 만료 시각을 검증한다. */
export async function verifySessionToken (token: string | undefined) {
	const secret = process.env.SESSION_SECRET
	if (!secret || !token) {
		return false
	}
	const [expiresAt, signature] = token.split('.')
	if (!expiresAt || !signature || Number(expiresAt) < Date.now()) {
		return false
	}
	return isEqual(signature, await sign(expiresAt, secret))
}
