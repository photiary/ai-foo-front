// **DO NOT EDIT. This is a template resource.**
import { publicApi } from '@workspace/core/api'
import type { ChatRequest, ChatResponse } from '@workspace/core/types'

/**
 * 채팅 완료 요청을 처리한다.
 *
 * @param request 채팅 요청 데이터
 * @returns ChatResponse
 */
export const postChat = async (request: ChatRequest) => {
  const response = await publicApi.post('/v1/chat', request)
  return response.data as ChatResponse
}
