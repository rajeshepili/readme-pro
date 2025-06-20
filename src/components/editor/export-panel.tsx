"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfile } from "@/contexts/profile-context"
import { generateMarkdown } from "@/lib/markdown-generator"
import { githubApi } from "@/lib/github-api"
import { Download, Copy, Github, FileText, Zap, CheckCircle, ExternalLink } from "lucide-react"
import { toast } from "sonner"

export function ExportPanel() {
  const { state } = useProfile()
  const [isExporting, setIsExporting] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [githubToken, setGithubToken] = useState("")

  const markdown = generateMarkdown(state)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const blob = new Blob([markdown], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "README.md"
      a.click()
      URL.revokeObjectURL(url)

      toast.success("Export successful!", {
        description: "Your README has been downloaded as README.md.",
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Export failed", {
        description: "There was an error exporting your README.",
      })
    }

    setIsExporting(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      toast.success("Copied to clipboard!", {
        description: "Your README markdown has been copied.",
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to copy", {
        description: "Please try again.",
      })
    }
  }

  const deployToGitHub = async () => {
    if (!state.username) {
      toast.error("GitHub username required", {
        description: "Please set your GitHub username first.",
      })
      return
    }

    if (!githubToken) {
      toast.error("GitHub token required", {
        description: "Please enter your GitHub personal access token.",
      })
      return
    }

    setIsDeploying(true)

    try {
      const success = await githubApi.createOrUpdateReadme(state.username, markdown, githubToken)

      if (success) {
        toast.success("README deployed successfully!", {
          description: "Your README has been updated on GitHub.",
        })
      } else {
        throw new Error("Deployment failed")
      }
    } catch (error) {
      console.error("Deployment error:", error)
      toast.error("Deployment failed", {
        description: "Please check your token and try again. Make sure the repository exists.",
      })
    }

    setIsDeploying(false)
  }

  const openGitHubRepo = () => {
    if (!state.username) {
      toast.error("GitHub username required", {
        description: "Please set your GitHub username first.",
      })
      return
    }

    const repoUrl = `https://github.com/${state.username}/${state.username}`
    window.open(repoUrl, "_blank")

  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Export & Deploy</h2>
        <p className="text-lg text-gray-600">Download your README or deploy it directly to GitHub</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export README
            </CardTitle>
            <CardDescription>Download your README as a markdown file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="font-medium">README.md</span>
              </div>
              <p className="text-sm text-gray-600">Standard GitHub README format</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleExport} disabled={isExporting} className="flex-1">
                {isExporting ? (
                  <>
                    <Download className="h-4 w-4 mr-2 animate-pulse" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* GitHub Deploy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              Deploy to GitHub
            </CardTitle>
            <CardDescription>Deploy your README directly to your GitHub profile repository</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-token">GitHub Personal Access Token</Label>
              <Input
                id="github-token"
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              />
              <div className="text-xs text-gray-500">
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=README%20Pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Create a new token
                </a>{" "}
                with &aposrepo&apos scope
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">
                    Repository: {state.username}/{state.username}
                  </p>
                  <p>This will create or update your profile README</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={deployToGitHub} disabled={isDeploying || !githubToken} className="flex-1">
                {isDeploying ? (
                  <>
                    <Github className="h-4 w-4 mr-2 animate-pulse" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Github className="h-4 w-4 mr-2" />
                    Deploy to GitHub
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={openGitHubRepo}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Manual Setup</h4>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Download your README using the export button</li>
                  <li>
                    Go to github.com/{state.username}/{state.username}
                  </li>
                  <li>Create or edit the README.md file</li>
                  <li>Paste your content and commit</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-2">Automatic Deploy</h4>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  <li>Create a GitHub personal access token</li>
                  <li>Enter the token in the deploy section</li>
                  <li>Click &quotDeploy to GitHub&quot</li>
                  <li>Your README will be automatically updated</li>
                </ol>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Pro Tip</p>
                  <p>
                    Make sure you have a repository named exactly like your username (e.g., {state.username}/
                    {state.username}) for your profile README to appear on your GitHub profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
