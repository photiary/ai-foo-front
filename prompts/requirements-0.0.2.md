# 페이지: 식사 이미지 분석 업로드 화면

- 도메인: apps/web/app/food
- URL: /food/analysis

- cachedTokens '입력 토큰(Cached)' 항목 추가하여 표시
- cachedInputCost '입력 비용(Cached)' 항목 추가하여 표시

# 페이지: 식사 이미지 분석 목록

- 도메인: apps/web/app/food
- URL: /food/analysis/list

- 목록에 'NG' 항목 추가
  - 분석 모드 앞에 추가
  - OK 이면 'O' 아이콘, 아이콘 마우스 오버시 '이미지 안 라벨 표시' 툴팁 표시
    - 모든 음식의 X 와 Y가 < 512 경우 
  - NG 이면 'X' 아이콘, 아이콘 마우스 오버시 '이미지 밖 라벨 표시' 툴팁 표시
    - 음식의 X 또는 Y 하나라도 >= 512 경우

# 페이지: 식사 이미지 분석 상세

- 도메인: apps/web/app/food
- URL: /food/analysis/{id}

- cachedTokens '입력 토큰(Cached)' 항목 추가하여 표시
- cachedInputCost '입력 비용(Cached)' 항목 추가하여 표시

- 과금 정보 바로 오른쪽에 ? 아이콘을 추가하고 클릭하면 새탭 열기로 'https://platform.openai.com/docs/pricing' 표신한다.

