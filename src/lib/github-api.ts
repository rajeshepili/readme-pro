const GITHUB_API_BASE = "https://api.github.com"

export interface GitHubUser {
  login: string
  name: string
  bio: string
  location: string
  blog: string
  email: string
  followers: number
  following: number
  public_repos: number
  avatar_url: string
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  private: boolean
}

export interface GitHubLanguageStats {
  [language: string]: number
}

export class GitHubAPI {
  private token?: string

  constructor(token?: string) {
    this.token = token
  }

  private async request(endpoint: string) {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    if (this.token) {
      headers["Authorization"] = `token ${this.token}`
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.request(`/users/${username}`)
  }

  async getUserRepos(username: string, per_page = 100): Promise<GitHubRepo[]> {
    return this.request(`/users/${username}/repos?sort=stars&per_page=${per_page}`)
  }

  async getRepoLanguages(username: string, repo: string): Promise<GitHubLanguageStats> {
    return this.request(`/repos/${username}/${repo}/languages`)
  }

  async getUserLanguageStats(username: string): Promise<{ [language: string]: { count: number; bytes: number } }> {
    const repos = await this.getUserRepos(username)
    const languageStats: { [language: string]: { count: number; bytes: number } } = {}

    // Process repos in batches to avoid rate limiting
    const batchSize = 10
    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize)
      const promises = batch.map(async (repo) => {
        if (repo.language) {
          try {
            const languages = await this.getRepoLanguages(username, repo.name)
            return { repo: repo.name, languages }
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}:`, error)
            return null
          }
        }
        return null
      })

      const results = await Promise.all(promises)

      results.forEach((result) => {
        if (result) {
          Object.entries(result.languages).forEach(([lang, bytes]) => {
            if (!languageStats[lang]) {
              languageStats[lang] = { count: 0, bytes: 0 }
            }
            languageStats[lang].count += 1
            languageStats[lang].bytes += bytes as number
          })
        }
      })

      // Add delay between batches to respect rate limits
      if (i + batchSize < repos.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    return languageStats
  }

  async createOrUpdateReadme(username: string, content: string, token: string): Promise<boolean> {
    try {
      const api = new GitHubAPI(token)

      // Check if README exists
      let sha: string | undefined
      try {
        const existing = await api.request(`/repos/${username}/${username}/contents/README.md`)
        sha = existing.sha
      } catch (error) {
        // README doesn't exist, that's fine
      }

      // Create or update README
      const body = {
        message: sha ? "Update README.md via README Pro" : "Create README.md via README Pro",
        content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
        ...(sha && { sha }),
      }

      await fetch(`${GITHUB_API_BASE}/repos/${username}/${username}/contents/README.md`, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      return true
    } catch (error) {
      console.error("Error creating/updating README:", error)
      return false
    }
  }
}

export const githubApi = new GitHubAPI()
