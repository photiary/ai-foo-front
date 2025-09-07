'use client'

import { useState, useEffect } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@workspace/ui/components/dialog'

const FOOD_EMOJIS = [
  '🍎', '🍊', '🍌', '🍇', '🍓', '🍑', '🥝', '🍅',
  '🥕', '🌽', '🥔', '🍠', '🥦', '🥬', '🥒', '🍄',
  '🥜', '🌰', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳',
  '🥓', '🍖', '🍗', '🦴', '🌭', '🍔', '🍟', '🍕',
  '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥞',
  '🧇', '🥯', '🍞', '🥖', '🥨', '🧀', '🥛', '🍼',
  '☕', '🍵', '🧃', '🥤', '🧊', '🍦', '🍧', '🍨',
  '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬',
  '🍭', '🍮', '🍯', '🍼', '🥛', '☕', '🍵', '🧃'
]

interface LoadingComponentProps {
  open: boolean
}

export function LoadingComponent({ open }: LoadingComponentProps) {
  const [currentEmoji, setCurrentEmoji] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % FOOD_EMOJIS.length)
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-md mx-auto"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary">
            🍽️ 음식 분석 중...
          </DialogTitle>
          <DialogDescription className="text-center">
            AI가 음식을 분석하고 영양 정보를 추출하고 있습니다.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-8xl mb-6 animate-bounce">
            {FOOD_EMOJIS[currentEmoji]}
          </div>
          
          <p className="text-muted-foreground text-center">
            <span className="text-sm">최대 5분까지 소요될 수 있습니다.</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
