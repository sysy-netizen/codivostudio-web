import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components = {
	h1: ({ children }: { children?: React.ReactNode }) => <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] text-black">{children}</h3>,
	h2: ({ children }: { children?: React.ReactNode }) => <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] text-black">{children}</h3>,
	h3: ({ children }: { children?: React.ReactNode }) => <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] text-black">{children}</h3>,
	h4: ({ children }: { children?: React.ReactNode }) => <h4 className="mt-10 text-xl font-medium tracking-[-0.02em] text-black">{children}</h4>,
	p: ({ children }: { children?: React.ReactNode }) => <p className="mt-8 leading-9">{children}</p>,
	ul: ({ children }: { children?: React.ReactNode }) => <ul className="mt-8 list-disc space-y-2 pl-6">{children}</ul>,
	ol: ({ children }: { children?: React.ReactNode }) => <ol className="mt-8 list-decimal space-y-2 pl-6">{children}</ol>,
	li: ({ children }: { children?: React.ReactNode }) => <li className="leading-8">{children}</li>,
	strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-black">{children}</strong>,
	a: ({ href, children }: { href?: string, children?: React.ReactNode }) => <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-black">{children}</a>,
	code: ({ children }: { children?: React.ReactNode }) => <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>,
	pre: ({ children }: { children?: React.ReactNode }) => <pre className="mt-8 overflow-x-auto rounded bg-black/5 p-4 font-mono text-sm">{children}</pre>,
	blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="mt-8 border-l-2 border-black/15 pl-5 text-black/60">{children}</blockquote>,
}

/** 아티클 본문 문단을 마크다운(#, ##, **, -, 링크 등)으로 렌더링한다. */
export function MarkdownContent ({ content }: { content: string[] }) {
	return (
		<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
			{content.join('\n\n')}
		</ReactMarkdown>
	)
}
