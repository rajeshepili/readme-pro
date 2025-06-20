"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { ProfileData, ProfileAction } from "@/types/global"

const initialState: ProfileData = {
  username: "",
  name: "",
  bio: "",
  location: "",
  website: "",
  email: "",
  currentWork: "",
  currentLearning: "",
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
    instagram: "",
    youtube: "",
  },
  skills: [],
  projects: [],
  gists: [],
  stats: {
    followers: 0,
    following: 0,
    repositories: 0,
    contributions: 0,
  },
  sections: [
    { id: "header", type: "header", title: "Header", enabled: true, order: 0 },
    { id: "about", type: "about", title: "About Me", enabled: true, order: 1 },
    { id: "skills", type: "skills", title: "Skills", enabled: true, order: 2 },
    { id: "projects", type: "projects", title: "Projects", enabled: true, order: 3 },
    { id: "gists", type: "gists", title: "Code Snippets", enabled: false, order: 4 },
    { id: "stats", type: "stats", title: "GitHub Stats", enabled: true, order: 5 },
  ],
  customSections: [],
}

function profileReducer(state: ProfileData, action: ProfileAction): ProfileData {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { ...state, ...action.payload }
    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.payload] }
    case "REMOVE_SKILL":
      return { ...state, skills: state.skills.filter((skill) => skill.id !== action.payload) }
    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill,
        ),
      }
    case "ADD_GIST":
      return { ...state, gists: [...state.gists, action.payload] }
    case "REMOVE_GIST":
      return { ...state, gists: state.gists.filter((gist) => gist.id !== action.payload) }
    case "REORDER_SECTIONS":
      return { ...state, sections: action.payload }
    case "TOGGLE_SECTION":
      return {
        ...state,
        sections: state.sections.map((section) =>
          section.id === action.payload.id ? { ...section, enabled: action.payload.enabled } : section,
        ),
      }
    case "LOAD_TEMPLATE":
      return { ...state, ...action.payload }
    case "RESET_PROFILE":
      return initialState
    default:
      return state
  }
}

const ProfileContext = createContext<{
  state: ProfileData
  dispatch: React.Dispatch<ProfileAction>
} | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, initialState)

  return <ProfileContext.Provider value={{ state, dispatch }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
