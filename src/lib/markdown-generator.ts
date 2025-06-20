import type { ProfileData } from "@/types/global"

export function generateMarkdown(profileData: ProfileData): string {
  const {
    username,
    name,
    bio,
    location,
    currentWork,
    currentLearning,
    socialLinks,
    skills,
    projects,
    gists,
    stats,
    sections,
  } = profileData

  let markdown = ""

  const sortedSections = sections
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order)

  for (const section of sortedSections) {
    switch (section.type) {
      case "header":
        markdown += generateHeader(name, bio, currentWork, currentLearning)
        break
      case "about":
        markdown += generateAbout(location, socialLinks)
        break
      case "skills":
        markdown += generateSkills(skills)
        break
      case "projects":
        markdown += generateProjects(projects.filter((p) => p.featured))
        break
      case "gists":
        markdown += generateGists(gists)
        break
      case "stats":
        markdown += generateStats(username, stats)
        break
    }
  }

  markdown += generateFooter()
  return markdown
}

// SECTION HELPERS

function generateHeader(
  name: string,
  bio: string,
  currentWork: string,
  currentLearning: string
): string {
  let header = name ? `# 👋 Hi there! I'm ${name}\n\n` : `# 👋 Hi there!\n\n`

  if (bio) {
    header += `### 🧠 About Me\n${bio}\n\n`
  }

  if (currentWork || currentLearning) {
    header += `### 🚀 What I'm Up To\n\n`
    if (currentWork) header += `- 🔭 Working on **${currentWork}**\n`
    if (currentLearning) {
      header += `- 🌱 Learning **${currentLearning}**\n`
      const badge = `![Currently Learning](https://img.shields.io/badge/Currently_Learning-${encodeURIComponent(currentLearning)}-blue?style=for-the-badge)\n\n`
      header += badge
    }
    header += `\n`
  }

  return header
}

function generateAbout(
  location: string,
  socialLinks: ProfileData["socialLinks"]
): string {
  let about = ""

  if (location) {
    about += `📍 **Location:** ${location}\n\n`
  }

  const links = Object.entries(socialLinks).filter(([, url]) => !!url)

  if (links.length > 0) {
    about += `### 🌐 Connect with me\n\n`
    for (const [platform, url] of links) {
      about += `- [${capitalize(platform)}](${url})\n`
    }
    about += `\n`
  }

  return about
}

function generateSkills(skills: ProfileData["skills"]): string {
  if (!skills || skills.length === 0) return ""

  let section = `### 🛠️ Skills\n\n`

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, ProfileData["skills"]>)

  for (const [category, items] of Object.entries(grouped)) {
    section += `#### ${category}\n`
    for (const skill of items) {
      const bar = "█".repeat(skill.level / 10) + "░".repeat(10 - skill.level / 10)
      section += `- ${skill.icon || "🔧"} **${skill.name}** \`${bar}\` ${skill.level}%\n`
    }
    section += `\n`
  }

  return section
}

function generateProjects(projects: ProfileData["projects"]): string {
  if (!projects || projects.length === 0) return ""

  let section = `### 🚀 Featured Projects\n\n`

  for (const project of projects.slice(0, 6)) {
    section += `#### 📌 [${project.name}](${project.url})\n`
    section += `*${project.description}*\n\n`
    section += `**Tech Stack:** \`${project.language}\` ・ ⭐ **${project.stars}** ・ 🍴 **${project.forks}**\n\n`
    section += `---\n\n`
  }

  return section
}

function generateGists(gists: ProfileData["gists"]): string {
  if (!gists || gists.length === 0) return ""

  let section = `### 💻 Code Snippets\n\n`

  for (const gist of gists.slice(0, 3)) {
    section += `#### ${gist.title}\n`
    if (gist.description) section += `${gist.description}\n\n`
    section += "```" + gist.language.toLowerCase() + "\n"
    section += gist.content.slice(0, 300)
    if (gist.content.length > 300) section += "..."
    section += "\n```\n\n"
    section += `[View full gist](${gist.url})\n\n`
    section += "---\n\n"
  }

  return section
}

function generateStats(username: string, stats: ProfileData["stats"]): string {
  if (!username) return ""

  return `### 📊 GitHub Stats\n\n` +
    `- 📦 **Public Repos:** ${stats.repositories}\n` +
    `${stats.contributions > 0 ? `- 📈 **Contributions:** ${stats.contributions}\n` : ''}`
}

function generateFooter(): string {
  let footer = ""
  footer += `### 🙌 Thanks for stopping by!\n`
  return footer
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
