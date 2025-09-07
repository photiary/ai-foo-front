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
  suitability: string
  suggestion: string
  usage: UsageInfo
  billing: BillingInfo
}

export interface ChatRequest {
  content: string
}

export interface ChatResponse {
  response: string
}
