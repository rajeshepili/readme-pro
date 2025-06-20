"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useProfile } from "@/contexts/profile-context"
import { Code2, Plus, Trash2, ExternalLink, Copy, Github } from "lucide-react"
import { toast } from "sonner"

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Dart",
  "HTML",
  "CSS",
  "SQL",
  "Shell",
  "PowerShell",
  "Dockerfile",
  "YAML",
  "JSON",
  "Markdown",
]

export function GistManager() {
  const { state, dispatch } = useProfile()
  const [newGist, setNewGist] = useState({
    title: "",
    description: "",
    language: "JavaScript",
    content: "",
    url: "",
  })
  const [fetchUrl, setFetchUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addGist = () => {
    if (!newGist.title.trim() || !newGist.content.trim()) {
      toast.error(
        "Gist details required", {
        description: "Please enter both title and content for the gist.",
      })
      return
    }

    const gist = {
      id: Date.now().toString(),
      title: newGist.title,
      description: newGist.description,
      language: newGist.language,
      content: newGist.content,
      url: newGist.url || `https://gist.github.com/${state.username}/${Date.now()}`,
    }

    dispatch({ type: "ADD_GIST", payload: gist })
    setNewGist({ title: "", description: "", language: "JavaScript", content: "", url: "" })

    toast(
      "Gist added!", {
      description: "Your code snippet has been added to your collection.",
    })
  }

  const removeGist = (id: string) => {
    dispatch({ type: "REMOVE_GIST", payload: id })
    toast(
      "Gist removed", {
      description: "The code snippet has been removed from your collection.",
    })
  }

  const fetchGistFromUrl = async () => {
    if (!fetchUrl.trim()) {
      toast.error(
        "URL required", {
        description: "Please enter a GitHub Gist URL.",
      })
      return
    }

    setIsLoading(true)
    try {
      // Extract gist ID from URL
      const gistId = fetchUrl.split("/").pop()?.split("#")[0]
      if (!gistId) throw new Error("Invalid Gist URL")

      const response = await fetch(`https://api.github.com/gists/${gistId}`)
      if (response.ok) {
        const gistData = await response.json()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstFile = Object.values(gistData.files)[0] as any

        const gist = {
          id: gistData.id,
          title: gistData.description || firstFile.filename,
          description: gistData.description || "",
          language: firstFile.language || "Text",
          content: firstFile.content || "",
          url: gistData.html_url,
        }

        dispatch({ type: "ADD_GIST", payload: gist })
        setFetchUrl("")

        toast(
          "Gist imported!", {
          description: "The GitHub Gist has been imported successfully.",
        })
      } else {
        throw new Error("Gist not found")
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        "Failed to fetch gist", {
        description: "Please check the URL and try again.",
      })
    }
    setIsLoading(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const copyGistMarkdown = (gist: any) => {
    const markdown = `### ${gist.title}\n\`\`\`${gist.language.toLowerCase()}\n${gist.content}\n\`\`\``

    navigator.clipboard.writeText(markdown)
    toast(
      "Gist markdown copied!", {
      description: "The gist markdown has been copied to your clipboard.",
    })
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-100 text-yellow-800 border-yellow-200",
      TypeScript: "bg-blue-100 text-blue-800 border-blue-200",
      Python: "bg-green-100 text-green-800 border-green-200",
      Java: "bg-orange-100 text-orange-800 border-orange-200",
      "C++": "bg-purple-100 text-purple-800 border-purple-200",
      Go: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Rust: "bg-red-100 text-red-800 border-red-200",
      PHP: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Ruby: "bg-pink-100 text-pink-800 border-pink-200",
      HTML: "bg-red-100 text-red-800 border-red-200",
      CSS: "bg-blue-100 text-blue-800 border-blue-200",
    }
    return colors[language] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Code Snippets & Gists</h2>
          <p className="text-lg text-gray-600">Showcase your code snippets and GitHub Gists</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Code Snippet
              </CardTitle>
              <CardDescription>Create a new code snippet to showcase in your README</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gist-title">Title</Label>
                  <Input
                    id="gist-title"
                    value={newGist.title}
                    onChange={(e) => setNewGist((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Useful React Hook"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gist-language">Language</Label>
                  <Select
                    value={newGist.language}
                    onValueChange={(value) => setNewGist((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {programmingLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gist-description">Description (Optional)</Label>
                <Input
                  id="gist-description"
                  value={newGist.description}
                  onChange={(e) => setNewGist((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the code snippet"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gist-content">Code Content</Label>
                <Textarea
                  id="gist-content"
                  value={newGist.content}
                  onChange={(e) => setNewGist((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Paste your code here..."
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gist-url">Gist URL (Optional)</Label>
                <Input
                  id="gist-url"
                  value={newGist.url}
                  onChange={(e) => setNewGist((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="https://gist.github.com/username/gist-id"
                />
              </div>

              <Button onClick={addGist} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Snippet
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Import from GitHub Gist
              </CardTitle>
              <CardDescription>Import an existing GitHub Gist by URL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fetch-url">GitHub Gist URL</Label>
                <Input
                  id="fetch-url"
                  value={fetchUrl}
                  onChange={(e) => setFetchUrl(e.target.value)}
                  placeholder="https://gist.github.com/username/gist-id"
                />
              </div>

              <Button onClick={fetchGistFromUrl} disabled={isLoading || !fetchUrl.trim()} className="w-full">
                <Github className="h-4 w-4 mr-2" />
                {isLoading ? "Importing..." : "Import Gist"}
              </Button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-2">How to get a Gist URL:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Go to gist.github.com</li>
                  <li>2. Find the gist you want to import</li>
                  <li>3. Copy the URL from your browser</li>
                  <li>4. Paste it above and click Import</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Your Code Snippets ({state.gists.length})</Label>
          </div>

          {state.gists.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Code2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">No code snippets yet</p>
                <p className="text-sm text-gray-500">Add your first code snippet or import from GitHub Gists!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {state.gists.map((gist) => (
                <Card key={gist.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            {gist.title}
                            <Badge variant="outline" className={`text-xs ${getLanguageColor(gist.language)}`}>
                              {gist.language}
                            </Badge>
                          </h4>
                          {gist.description && <p className="text-sm text-gray-600 mt-1">{gist.description}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          {gist.url && (
                            <Button variant="outline" size="sm" onClick={() => window.open(gist.url, "_blank")}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => copyGistMarkdown(gist)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeGist(gist.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      <div className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto">
                        <pre className="text-xs font-mono whitespace-pre-wrap">
                          {gist.content.length > 200 ? `${gist.content.substring(0, 200)}...` : gist.content}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 rounded-full p-2">
              <Code2 className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-indigo-900">Code Snippet Tips</h4>
              <ul className="text-sm text-indigo-800 mt-2 space-y-1">
                <li>• Share your most useful and reusable code snippets</li>
                <li>• Add clear descriptions to help others understand the code</li>
                <li>• Keep snippets focused and well-commented</li>
                <li>• Link to full GitHub Gists for longer code examples</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
