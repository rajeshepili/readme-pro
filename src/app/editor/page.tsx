"use client"

import { EditorPanel } from "@/components/editor/editor-panel"
import { PreviewPanel } from "@/components/editor/preview-panel"

export default function EditorPage() {
  return (
    <div className="min-h-[100vh]">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8 h-[calc(100vh-120px)] sm:h-[calc(100vh-200px)]">
          <EditorPanel />
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}
