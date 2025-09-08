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
  promptTokens: number | null
  completionTokens: number | null
  totalTokens: number | null
  modelName: string
  requestDurationMs: number
}

export interface FoodAnalysisResponse {
  id: number
  foods: FoodItem[]
  suitability: string
  suggestion: string
  usage: UsageInfo
  billing: BillingInfo
  imageSize: string
  imageFileName: string
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
