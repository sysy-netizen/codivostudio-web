import type { ReactNode } from 'react'

const urlPattern = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/g

/** 본문 문단 속 URL 텍스트를 클릭 가능한 링크로 바꾼다. */
export function linkifyText (text: string): ReactNode[] {
	const nodes: ReactNode[] = []
	let lastIndex = 0
	let key = 0
	let match: RegExpExecArray | null
	const regex = new RegExp(urlPattern)

	while ((match = regex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			nodes.push(text.slice(lastIndex, match.index))
		}
		const raw = match[0].replace(/[),.;:!?]+$/, '')
		const trailing = match[0].slice(raw.length)
		const href = raw.startsWith('www.') ? `https://${raw}` : raw
		nodes.push(
			<a key={key++} href={href} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-black">
				{raw}
			</a>,
		)
		if (trailing) {
			nodes.push(trailing)
		}
		lastIndex = match.index + match[0].length
	}
	if (lastIndex < text.length) {
		nodes.push(text.slice(lastIndex))
	}
	return nodes
}
