/**
 * 공통 포맷팅 유틸리티 함수들
 */

/**
 * 과금 정보를 USD와 KRW로 포맷팅
 * @param cost USD 비용
 * @param currency 통화 (기본값: 'USD')
 * @returns 포맷팅된 비용 문자열
 */
export const formatCost = (cost: number | undefined | null, currency: string = 'USD'): string => {
  if (cost === undefined || cost === null) {
    return 'N/A'
  }
  
  if (currency === 'USD') {
    const koreanWon = cost * 1400 // 환율 1,400원으로 계산
    return `$${cost.toFixed(7)} (₩${koreanWon.toFixed(7)})`
  }
  
  return `${cost.toFixed(7)} ${currency}`
}

/**
 * 시간을 밀리초에서 읽기 쉬운 형태로 포맷팅
 * @param ms 밀리초
 * @returns 포맷팅된 시간 문자열
 */
export const formatDuration = (ms: number | undefined | null): string => {
  if (ms === undefined || ms === null) {
    return 'N/A'
  }
  
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60000).toFixed(1)}m`
}

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param dateString ISO 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return 'N/A'
  }
  
  try {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'N/A'
  }
}
