"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useProfile } from "@/contexts/profile-context"
import { Plus, Trash2, Wrench, Star, ChevronDown, ChevronUp, Lightbulb } from "lucide-react"
import { toast } from "sonner"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

const skillCategories = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Design", "Testing", "Other"]
const skillLevels = [
  { value: "Learning", label: "Learning", level: 20 },
  { value: "Beginner", label: "Beginner", level: 40 },
  { value: "Intermediate", label: "Intermediate", level: 60 },
  { value: "Advanced", label: "Advanced", level: 80 },
  { value: "Expert", label: "Expert", level: 100 },
]

const skillIcons: { [key: string]: string } = {
  // Frontend
  JavaScript: "🟨",
  TypeScript: "🔷",
  React: "⚛️",
  Vue: "💚",
  Angular: "🔴",
  HTML: "🌐",
  CSS: "🎨",
  SASS: "💅",
  Tailwind: "🌊",
  Bootstrap: "🅱️",

  // Backend
  "Node.js": "💚",
  Python: "🐍",
  Java: "☕",
  "C++": "⚡",
  Go: "🐹",
  Rust: "🦀",
  PHP: "🐘",
  Ruby: "💎",
  Swift: "🍎",
  Kotlin: "🎯",

  // Database
  MongoDB: "🍃",
  PostgreSQL: "🐘",
  MySQL: "🐬",
  Redis: "🔴",
  SQLite: "📊",

  // DevOps
  Docker: "🐳",
  Kubernetes: "☸️",
  AWS: "☁️",
  Firebase: "🔥",
  Git: "📚",
  Linux: "🐧",
  Jenkins: "🔧",
  Terraform: "🏗️",

  // Mobile
  "React Native": "📱",
  Flutter: "🦋",
  iOS: "🍎",
  Android: "🤖",

  // Design
  Figma: "🎨",
  Photoshop: "🖼️",
  Illustrator: "✏️",
  Sketch: "📐",
}

export function SkillsEditor() {
  const { state, dispatch } = useProfile()
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "Beginner",
    category: "Frontend",
  })
  const [isOpen, setIsOpen] = useState(false)

  const addSkill = () => {
    if (!newSkill.name.trim()) {
      toast.error("Skill name required", {
        description: "Please enter a skill name.",
      })
      return
    }

    const skillExists = state.skills.some((skill) => skill.name.toLowerCase() === newSkill.name.toLowerCase())

    if (skillExists) {
      toast.error("Skill already exists", {
        description: "This skill is already in your list.",
      })
      return
    }

    const levelData = skillLevels.find((l) => l.value === newSkill.level)
    const skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      level: levelData?.level || 40,
      category: newSkill.category,
      icon: skillIcons[newSkill.name] || "🔧",
    }

    dispatch({ type: "ADD_SKILL", payload: skill })
    setNewSkill({ name: "", level: "Beginner", category: "Frontend" })

    toast.success("Skill added!", {
      description: `${newSkill.name} has been added to your skills.`,
    })
  }

  const removeSkill = (id: string) => {
    dispatch({ type: "REMOVE_SKILL", payload: id })
    toast.success("Skill removed", {
      description: "The skill has been removed from your list.",
    })
  }

  const groupedSkills = state.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as { [key: string]: typeof state.skills },
  )

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (level >= 60) return "text-blue-600 bg-blue-50 border-blue-200"
    if (level >= 40) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-gray-600 bg-gray-50 border-gray-200"
  }

  const getLevelLabel = (level: number) => {
    const levelData = skillLevels.find((l) => l.level === level)
    return levelData?.label || "Beginner"
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blue-600" />
          <h2 className="text-3xl font-semibold">Skills & Technologies</h2>
        </div>

        {/* Skills Tips */}
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 p-4 rounded-2xl outline outline-purple-300"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-stretch justify-between cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 shrink-0">
                  <Lightbulb className="h-4 w-4 text-purple-600" />
                </div>
                <h4 className="font-medium text-purple-900 mb-1">Skills Tips</h4>
              </div>
              <div className="flex items-center">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-purple-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-600" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-16">
            <div className="gap-3">
              <ul className="text-sm text-purple-800 space-y-1 list-disc">
                <li>Be honest about your skill levels</li>
                <li>Focus on skills relevant to your career goals</li>
                <li>Update your skills regularly as you learn</li>
                <li>Consider adding emerging technologies you&aposre learning</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Skill
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skill-name">Skill Name</Label>
                <Input
                  id="skill-name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., React, Python, Docker..."
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skill-category">Category</Label>
                <Select
                  value={newSkill.category}
                  onValueChange={(value) => setNewSkill((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => setNewSkill((prev) => ({ ...prev, level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addSkill} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Your Skills ({state.skills.length})</Label>
          </div>

          {state.skills.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Wrench className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">No skills added yet</p>
                <p className="text-sm text-gray-500">Add your first skill to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <Card key={category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {category}
                      <Badge variant="secondary" className="ml-auto">
                        {skills.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skills.map((skill) => (
                        <div key={skill.id} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{skill.icon}</span>
                              <span className="font-medium">{skill.name}</span>
                              <Badge variant="outline" className={`text-xs ${getSkillLevelColor(skill.level)}`}>
                                {getLevelLabel(skill.level)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-600">{getLevelLabel(skill.level)}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSkill(skill.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
