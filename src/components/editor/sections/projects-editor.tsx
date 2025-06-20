"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useProfile } from "@/contexts/profile-context"
import { Github, Star, GitFork, ExternalLink, FolderOpen, RefreshCw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

export function ProjectsEditor() {
  const { state, dispatch } = useProfile()
  const [isLoading, setIsLoading] = useState(false)

  const fetchGitHubProjects = async () => {
    if (!state.username) {
      toast.error(
        "Username required",{
        description: "Please enter your GitHub username first.",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`https://api.github.com/users/${state.username}/repos?sort=stars&per_page=20`)

      if (response.ok) {
        const repos = await response.json()
        const projects = repos.map((repo: any) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || "No description available",
          url: repo.html_url,
          language: repo.language || "Unknown",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          featured: repo.stargazers_count > 0, // Auto-feature repos with stars
        }))

        dispatch({
          type: "UPDATE_PROFILE",
          payload: { projects },
        })

        toast(
          "Projects fetched successfully!",{
          description: `Found ${projects.length} repositories.`,
        })
      } else {
        throw new Error("Failed to fetch repositories")
      }
    } catch (error) {
      toast.error(
        "Failed to fetch projects",{
        description: "Please check your username and try again.",
      })
    }
    setIsLoading(false)
  }

  const toggleProjectFeatured = (projectId: string, featured: boolean) => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        projects: state.projects.map((project) => (project.id === projectId ? { ...project, featured } : project)),
      },
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
      Swift: "bg-orange-100 text-orange-800 border-orange-200",
      Kotlin: "bg-purple-100 text-purple-800 border-purple-200",
      HTML: "bg-red-100 text-red-800 border-red-200",
      CSS: "bg-blue-100 text-blue-800 border-blue-200",
      Unknown: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[language] || colors.Unknown
  }

  const featuredProjects = state.projects.filter((project) => project.featured)

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FolderOpen className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Projects & Repositories</h3>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">GitHub Integration</CardTitle>
            <Button onClick={fetchGitHubProjects} disabled={isLoading || !state.username} size="sm">
              {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Github className="h-4 w-4 mr-2" />}
              {isLoading ? "Fetching..." : "Fetch Projects"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            {state.username ? (
              <p>
                Fetch your latest repositories from{" "}
                <a
                  href={`https://github.com/${state.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/{state.username}
                </a>
              </p>
            ) : (
              <p>Enter your GitHub username in the About section to fetch projects.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">All Projects ({state.projects.length})</Label>
          <div className="text-sm text-gray-600">{featuredProjects.length} featured</div>
        </div>

        {state.projects.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-2">No projects found</p>
              <p className="text-sm text-gray-500">Fetch your GitHub repositories to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {state.projects.map((project) => (
              <Card
                key={project.id}
                className={`transition-all ${project.featured ? "ring-2 ring-blue-200 bg-blue-50/30" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900 truncate">{project.name}</h4>
                        <Badge variant="outline" className={`text-xs ${getLanguageColor(project.language)}`}>
                          {project.language}
                        </Badge>
                        {project.featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {project.forks}
                        </span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Label htmlFor={`featured-${project.id}`} className="text-sm">
                        Featured
                      </Label>
                      <Switch
                        id={`featured-${project.id}`}
                        checked={project.featured}
                        onCheckedChange={(checked) => toggleProjectFeatured(project.id, checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-green-100 rounded-full p-2">
            <FolderOpen className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-green-900">Project Tips</h4>
            <ul className="text-sm text-green-800 mt-2 space-y-1">
              <li>• Feature your best and most recent projects</li>
              <li>• Add detailed descriptions to your repositories</li>
              <li>• Use topics/tags on GitHub for better categorization</li>
              <li>• Pin important repositories on your GitHub profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </ScrollArea>
  )
}
