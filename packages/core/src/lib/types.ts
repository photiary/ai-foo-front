// **DO NOT EDIT. This is a template resource.**

export interface Position {
  x: number
  y: number
}

export interface FoodItem {
  name: string
  protein: number
  carbs: number
  fat: number
  calories: number
  position: Position
}

export interface BillingInfo {
  inputCost: number
  outputCost: number
  totalCost: number
  currency: string
}

export interface UsageInfo {
  promptTokens: number
  completionTokens: number
  totalTokens: number
  modelName: string
  requestDurationMs: number
}

export interface FoodAnalysisResponse {
  id: number
  foods: FoodItem[]
  userStatus: string | null
  suitability: string | null
  suggestion: string | null
  usage: UsageInfo
  billing: BillingInfo
  imageSize: string
  imageFileName: string
  analysisMode: string
  createdAt: string
}

export interface FoodAnalysisListItem {
  id: number
  modelName?: string
  imageWidth?: number
  imageHeight?: number
  requestDurationMs?: number
  totalTokens?: number
  totalCost?: number
  createdAt?: string
}

export interface ChatRequest {
  content: string
}

export interface ChatResponse {
  response: string
}
