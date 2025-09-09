'use client'

import { useState, KeyboardEvent } from 'react'
import { Badge } from '@workspace/ui/components/badge'
import { Input } from '@workspace/ui/components/input'
import { X } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
}

export function TagInput({ tags, onTagsChange, placeholder = '입력하고 엔터를 눌러주세요' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // 백스페이스로 태그 삭제
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onTagsChange([...tags, trimmedValue])
      setInputValue('')
    }
  }

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="relative">
      <div className="border-input focus-within:border-ring focus-within:ring-ring/50 flex min-h-9 flex-wrap items-center gap-2 rounded-md border bg-transparent px-1 py-1 focus-within:ring-[3px]">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center justify-center gap-1 px-2 py-1 text-xs">
            <span className="flex items-center">{tag}</span>
            <button
              onClick={() => removeTag(index)}
              className="hover:bg-destructive/20 flex items-center justify-center rounded-full p-0.5"
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="placeholder:text-muted-foreground min-w-[120px] flex-1 bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  )
}
