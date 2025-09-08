// **DO NOT EDIT. This is a template resource.**
import { publicApi } from '@workspace/core/api'
import type { 
  FoodAnalysisResponse,
  FoodAnalysisListItem,
  FoodItem,
  Position,
  BillingInfo,
  UsageInfo
} from '@workspace/core/types'

/**
 * 모든 음식 분석 목록을 조회한다.
 *
 * @returns FoodAnalysisResponse[]
 */
export const fetchFoodAnalysisList = async () => {
  const response = await publicApi.get('/v1/food/analysis')
  return response.data as FoodAnalysisResponse[]
}

/**
 * 음식 이미지를 분석한다.
 *
 * @param image 분석할 음식 이미지 파일
 * @param status 사용자 상태
 * @returns FoodAnalysisResponse
 */
export const postFoodAnalysis = async (image: File, status: string) => {
  const formData = new FormData()
  formData.append('image', image)
  
  const response = await publicApi.post('/v1/food/analysis', formData, {
    params: { status },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 300000,
  })
  return response.data as FoodAnalysisResponse
}

/**
 * 특정 음식 분석 상세 정보를 조회한다.
 *
 * @param id 분석 ID
 * @returns FoodAnalysisResponse
 */
export const fetchFoodAnalysisDetail = async (id: number) => {
  const response = await publicApi.get(`/v1/food/analysis/${id}`)
  return response.data as FoodAnalysisResponse
}
