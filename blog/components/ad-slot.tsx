'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const AD_CLIENT = 'ca-pub-7889109774195055'
const AD_SLOT = '5032173006'

/** Google AdSense 광고 한 칸. 운영 환경에서만 광고를 요청하며, 같은 칸에는 한 번만 요청한다. */
export function AdSlot() {
  const insRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }
    const ins = insRef.current
    if (!ins || ins.dataset.adsbygoogleStatus) {
      return
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // 광고 스크립트가 차단되었거나 아직 준비되지 않은 경우: 빈 칸으로 둔다.
    }
  }, [])

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
