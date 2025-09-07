// **DO NOT EDIT. This is a template resource.**
import { publicApi } from '@workspace/core/api'

/**
 * 사용 가능한 모델 목록을 조회한다.
 *
 * @returns string
 */
export const fetchModels = async () => {
  const response = await publicApi.get('/v1/models')
  return response.data as string
}
