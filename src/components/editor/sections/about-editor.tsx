"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RichTextEditor } from "@/components/blocks/rich-text-editor"
import { ErrorMessage } from "@/components/blocks/error-message"
import { useProfile } from "@/contexts/profile-context"
import { useLoading } from "@/contexts/loading-context"
import { githubApi } from "@/lib/github-api"
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Youtube,
  User,
  MapPin,
  Mail,
  ExternalLink,
  CheckCircle,
  Briefcase,
  BookOpen,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

export function AboutEditor() {
  const { state, dispatch } = useProfile()
  const { setLoading, setLoadingMessage } = useLoading()
  const [error, setError] = useState<string | null>(null)

  const updateProfile = (field: string, value: string) => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { [field]: value },
    })
  }

  const updateSocialLink = (platform: string, value: string) => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        socialLinks: {
          ...state.socialLinks,
          [platform]: value,
        },
      },
    })
  }

  const fetchGitHubData = async () => {
    if (!state.username) {
      toast.error("Oops! Username missing! 🤔", {
        description: "Please enter your GitHub username first.",
      })
      return
    }

    setError(null)
    setLoading(true)
    setLoadingMessage("Fetching your awesome GitHub data...")

    try {
      const userData = await githubApi.getUser(state.username)
      const repos = await githubApi.getUserRepos(state.username, 50)

      dispatch({
        type: "UPDATE_PROFILE",
        payload: {
          name: userData.name || state.name,
          bio: userData.bio || state.bio,
          location: userData.location || state.location,
          website: userData.blog || state.website,
          socialLinks: {
            ...state.socialLinks,
            github: userData.html_url,
          },
          stats: {
            followers: userData.followers,
            following: userData.following,
            repositories: userData.public_repos,
            contributions: state.stats.contributions,
          },
          projects: repos.slice(0, 10).map((repo) => ({
            id: repo.id.toString(),
            name: repo.name,
            description: repo.description || "No description available",
            url: repo.html_url,
            language: repo.language || "Unknown",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            featured: repo.stargazers_count > 0,
          })),
        },
      })

      toast.success("Data fetched successfully! 🎉", {
        description: "Your GitHub profile data has been imported.",
      })
    } catch (error) {
      console.error("GitHub API error:", error)
      setError("Failed to fetch GitHub data")
      toast.error("GitHub decided to be difficult today 😅", {
        description: "Please check your username and try again. Make sure your profile is public.",
      })
    }

    setLoading(false)
  }

  const socialPlatforms = [
    { key: "github", label: "GitHub", icon: Github, placeholder: "https://github.com/username" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/username" },
    { key: "twitter", label: "Twitter", icon: Twitter, placeholder: "https://twitter.com/username" },
    { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/username" },
    { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@username" },
  ]

  if (error) {
    return <ErrorMessage title="Something went wrong!" message={error} onRetry={() => setError(null)} />
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6 p-1">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-semibold">Personal Information</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Label htmlFor="username">GitHub Username *</Label>
                <Input
                  id="username"
                  value={state.username}
                  onChange={(e) => updateProfile("username", e.target.value)}
                  placeholder="your-username"
                  className="mt-1"
                />
              </div>
              <div className="flex flex-col justify-end">
                <Button onClick={fetchGitHubData} disabled={!state.username} className="shrink-0 w-full sm:w-auto">
                  <Github className="h-4 w-4 mr-2" />
                  Fetch Data
                </Button>
              </div>
            </div>

            {state.stats.repositories > 0 && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Connected to GitHub • {state.stats.repositories} repositories found</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={state.name}
                  onChange={(e) => updateProfile("name", e.target.value)}
                  placeholder="Your Full Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={state.location}
                  onChange={(e) => updateProfile("location", e.target.value)}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (supports markdown formatting)</Label>
              <RichTextEditor
                value={state.bio}
                onChange={(value) => updateProfile("bio", value)}
                placeholder="Tell the world about yourself... 🚀"
                maxLength={1000}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={state.email}
                  onChange={(e) => updateProfile("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  value={state.website}
                  onChange={(e) => updateProfile("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentWork" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Currently Working On
                </Label>
                <Input
                  id="currentWork"
                  value={state.currentWork}
                  onChange={(e) => updateProfile("currentWork", e.target.value)}
                  placeholder="e.g., Building a React app"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentLearning" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Currently Learning
                </Label>
                <Input
                  id="currentLearning"
                  value={state.currentLearning}
                  onChange={(e) => updateProfile("currentLearning", e.target.value)}
                  placeholder="e.g., Machine Learning, Go"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Social Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <div key={platform.key} className="space-y-2">
                    <Label htmlFor={platform.key} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {platform.label}
                    </Label>
                    <Input
                      id={platform.key}
                      value={state.socialLinks[platform.key as keyof typeof state.socialLinks]}
                      onChange={(e) => updateSocialLink(platform.key, e.target.value)}
                      placeholder={platform.placeholder}
                    />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
