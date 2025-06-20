"use client"

import { Button } from "@/components/ui/button"
import { useProfile } from "@/contexts/profile-context"
import { generateMarkdown } from "@/lib/markdown-generator"
import { Copy, Download, Eye } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Separator } from "@/components/ui/separator"

export function PreviewPanel() {
    const { state } = useProfile()
    const markdown = generateMarkdown(state)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(markdown)
            toast.success("Copied to clipboard!", {
                description: "Your README markdown has been copied.",
            })
        } catch (error) {
            toast.error("Failed to copy", {
                description: "Please try again.",
            })
        }
    }

    const downloadMarkdown = () => {
        const blob = new Blob([markdown], { type: "text/markdown" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "README.md"
        a.click()
        URL.revokeObjectURL(url)

        toast.success("Download started!", {
            description: "Your README.md file is being downloaded.",
        })
    }

    return (
        <div className="h-full">
            <section className="flex flex-row justify-between">
                <div className="items-center justify-between">
                    <div>
                        <h3 className="flex font-semibold font-sans items-center gap-2 text-lg sm:text-xl">
                            <Eye className="h-5 w-5" />
                            README Preview
                        </h3>
                        <p className="text-muted-foreground text-sm">Live preview of your GitHub README</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                    </Button>
                    <Button size="sm" onClick={downloadMarkdown}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                </div>
            </section>
            <Separator className="my-3" />
            <section>
                <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="p-6">
                        <div className="bg-white border rounded-lg p-6">
                            <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
                                <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </section>
        </div>
    )
}
