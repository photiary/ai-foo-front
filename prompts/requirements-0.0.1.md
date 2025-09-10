# 페이지: 식사 이미지 분석 업로드 화면

- 도메인: apps/web/app/food
- URL: /food/analysis

- 분석 모드 토글 버튼을 추가한다.
  - analysisMode: 'IMG_ONLY'(식사 이미지 분석만) | 'IMG_SUGG'(식사 이미지 분석과 사용자 상태에 따라 제안)
  - /v1/food/analysis에 파라미터 추가
- '식사 이미지 분석만'인 경우는 '사용자 상태' 정보는 필수가 아니다.
- 식사 분석 응답에서 'IMG_ONLY'인 경우는 다음 카드만 표시한다.
  - 분석된 음식 이미지
  - Token 사용량
  - 과금 정보
  - 응답 시간

# 페이지: 식사 이미지 분석 목록

- 도메인: apps/web/app/food
- URL: /food/analysis/list

- 목록 항목에 '분석 모드' 추가
  - IMG_ONLY 에 맞는 아이콘 표시, 아이콘 마우스 오버시 '식사 이미지 분석만' 툴팁 표시
  - IMG_SUGG 에 맞는 아이콘 표시, 아이콘 마우스 오버시 '식사 이미지 분석과 사용자 상태에 따라 제안' 툴팁 표시

# 페이지: 식사 이미지 분석 상세

- 도메인: apps/web/app/food
- URL: /food/analysis/{id}

- 식사 분석 응답에서 'IMG_ONLY'인 경우는 다음 카드만 표시한다.
  - 분석된 음식 이미지
  - Token 사용량
  - 과금 정보
  - 응답 시간
