"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const funErrorMessages = [
  "Oops! Something went sideways 🙃",
  "Houston, we have a problem 🚀",
  "The hamsters powering our servers took a coffee break ☕",
  "Our code decided to take a vacation 🏖️",
  "Error 404: Motivation not found 😅",
  "The internet gremlins are at it again 👹",
  "Something broke, but we're on it! 🔧",
  "Plot twist: This wasn't supposed to happen 📚",
  "Our servers are having an existential crisis 🤔",
  "Error: Success not found, please try again 🎯",
]

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorMessage({ title, message, onRetry, showRetry = true }: ErrorMessageProps) {
  const randomMessage = funErrorMessages[Math.floor(Math.random() * funErrorMessages.length)]

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-red-100 rounded-full p-4 mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title || randomMessage}</h3>

      <p className="text-gray-600 mb-6 max-w-md">
        {message || "Don't worry, these things happen. Try refreshing or come back later!"}
      </p>

      {showRetry && onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
