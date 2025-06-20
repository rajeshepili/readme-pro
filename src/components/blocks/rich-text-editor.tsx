"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, Strikethrough, Hash } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Tell the world about yourself...",
  maxLength = 1000,
  className = "",
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [charCount, setCharCount] = useState(value.length)

  useEffect(() => {
    setCharCount(value.length)
  }, [value])

  const insertMarkdown = (before: string, after = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    if (newText.length <= maxLength) {
      onChange(newText)

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, end + before.length)
      }, 0)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      onChange(newValue)
    }
  }

  const formatButtons = [
    { icon: Bold, label: "Bold", before: "**", after: "**" },
    { icon: Italic, label: "Italic", before: "*", after: "*" },
    { icon: Underline, label: "Underline", before: "<u>", after: "</u>" },
    { icon: Strikethrough, label: "Strikethrough", before: "~~", after: "~~" },
    { icon: Hash, label: "Heading", before: "### ", after: "" },
  ]

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-t-md border border-b-0">
        {formatButtons.map(({ icon: Icon, label, before, after }) => (
          <Button
            key={label}
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => insertMarkdown(before, after)}
            title={label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          rows={4}
          className={`resize-none rounded-t-none ${className}`}
        />

        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          {charCount}/{maxLength}
        </div>
      </div>

      {charCount > maxLength * 0.9 && (
        <p className="text-xs text-amber-600">
          {charCount >= maxLength ? "Character limit reached!" : "Approaching character limit"}
        </p>
      )}
    </div>
  )
}
