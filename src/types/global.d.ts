export interface ProfileData {
  username: string
  name: string
  bio: string
  location: string
  website: string
  email: string
  currentWork: string
  currentLearning: string

  socialLinks: {
    github: string
    linkedin: string
    twitter: string
    website: string
    instagram: string
    youtube: string
  }
  skills: Array<{
    id: string
    name: string
    level: number
    category: string
    icon?: string
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    url: string
    language: string
    stars: number
    forks: number
    featured: boolean
  }>
  gists: Array<{
    id: string
    title: string
    description: string
    url: string
    language: string
    content: string
  }>
  stats: {
    followers: number
    following: number
    repositories: number
    contributions: number
  }
  sections: Array<{
    id: string
    type: string
    title: string
    enabled: boolean
    order: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any
  }>
  customSections: Array<{
    id: string
    title: string
    content: string
    order: number
  }>
}

export type ProfileAction =
  | { type: "UPDATE_PROFILE"; payload: Partial<ProfileData> }
  | { type: "ADD_SKILL"; payload: ProfileData["skills"][0] }
  | { type: "REMOVE_SKILL"; payload: string }
  | { type: "UPDATE_SKILL"; payload: { id: string; data: Partial<ProfileData["skills"][0]> } }
  | { type: "ADD_GIST"; payload: ProfileData["gists"][0] }
  | { type: "REMOVE_GIST"; payload: string }
  | { type: "ADD_BADGE"; payload: ProfileData["badges"][0] }
  | { type: "REMOVE_BADGE"; payload: string }
  | { type: "REORDER_SECTIONS"; payload: ProfileData["sections"] }
  | { type: "TOGGLE_SECTION"; payload: { id: string; enabled: boolean } }
  | { type: "LOAD_TEMPLATE"; payload: ProfileData }
  | { type: "RESET_PROFILE" }

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
