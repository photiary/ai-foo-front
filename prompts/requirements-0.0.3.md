# 페이지: 식사 이미지 분석 업로드 화면

- 도메인: apps/web/app/food
- URL: /food/analysis

- LLM 모델 선택 기능을 추가한다.
- `UsageInfo.tsx` 컴포넌트와 같이 model를 표시할 때는 `Badge` 컴포넌트를 사용
- 선택 활성화 색상 표시
- Model 마우스 오버시 모델 과금 정보 카드를 표시
- 선택 항목은 다음과 같다.
  - `gpt-5-mini`
  - `local-model`(디폴트)
  - `gpt-5`

- /v1/food/analysis 호출할 때 `modelName`을 전달한다.


# 컴포넌트: 모델 과금 정보 카드

- `HoverCard` 컴포넌트를 사용
- 모델에 맞는 과금 정보를 Input, Cached input, Output 항목 표시
- 파라미터: 
  - modelName

- Model 별 과금 표
|Model|Input|Cached input|Output|
|---|---|---|---|
|gpt-5|$1.25|$0.125|$10.00|
|gpt-5-mini|$0.25|$0.025|$2.00|
|local-model|$0|$0|$0|

# 페이지: 식사 이미지 분석 목록

- 도메인: apps/web/app/food
- URL: /food/analysis/list

- 필터 추가
  - modelName