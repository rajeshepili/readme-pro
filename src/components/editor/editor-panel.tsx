"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Wrench, FolderOpen, Layout, Code2, Download } from "lucide-react"
import { AboutEditor } from "./sections/about-editor"
import { ExportPanel } from "./export-panel"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SkillsEditor } from "./sections/skills-editor"
import { ProjectsEditor } from "./sections/projects-editor"
import { GistManager } from "./sections/gist-manager"

export function EditorPanel() {
    return (
        <div>
            <div className="h-full rounded-xl flex flex-col">
                <section className="flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="flex font-semibold font-sans items-center gap-2 text-lg sm:text-xl">
                                <Settings className="h-5 w-5" />
                                Profile Editor
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Create your GitHub profile with this amazing editor
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <Tabs defaultValue="about" className="w-full h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 bg-transparent h-12 gap-1">
                            <TabsTrigger value="about" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2">
                                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">About</span>
                            </TabsTrigger>
                            <TabsTrigger value="skills" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2">
                                <Wrench className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Skills</span>
                            </TabsTrigger>
                            <TabsTrigger value="projects" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2">
                                <FolderOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Projects</span>
                            </TabsTrigger>
                            <TabsTrigger value="gists" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2">
                                <Code2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Gists</span>
                            </TabsTrigger>
                            <TabsTrigger value="export" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2">
                                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Export</span>
                            </TabsTrigger>
                        </TabsList>
                        <Separator className="mb-3" />
                        <ScrollArea>
                            <div className=" flex-1 overflow-x-hidden bg-white">
                                <TabsContent value="about" className="mt-0 h-full">
                                    <AboutEditor />
                                </TabsContent>
                                <TabsContent value="skills" className="mt-0 h-full">
                                    <SkillsEditor />
                                </TabsContent>
                                <TabsContent value="projects" className="mt-0 h-full">
                                    <ProjectsEditor />
                                </TabsContent>
                                <TabsContent value="gists" className="mt-0 h-full">
                                    <GistManager />
                                </TabsContent>
                                <TabsContent value="export" className="mt-0 h-full">
                                    <ExportPanel />
                                </TabsContent>
                            </div>
                        </ScrollArea>
                    </Tabs>
                </section>
            </div>
        </div>
    )
}
