/**
 * 광고 사용 여부. NEXT_PUBLIC_ADS_ENABLED=true 로 설정하고 다시 배포해야 켜진다.
 * 설정하지 않으면 꺼진 상태라 광고 스크립트도 광고 칸도 나오지 않는다.
 */
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true'

/** AdSense 광고 단위 번호. 위치별로 단위를 나눠 쓴다. (서버·클라이언트 컴포넌트 양쪽에서 쓰므로 별도 파일로 둔다) */
export const AD_SLOTS = {
	articleList: '5032173006',
	articleDetailBottom: '6134994978',
} as const
