import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Heart } from "lucide-react"
import Logo from "@/components/layout/logo";

export function Footer() {
    return (
        <footer className="border-t bg-gray-50/50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <Logo />

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <span>Created with</span>
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>by</span>
                            <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto font-semibold text-blue-600"
                                asChild
                            >
                                <Link href={"https://linkedin.com/in/rajeshepili"} target="_blank">
                                    Rajesh Epili
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link href={"https://linkedin.com/in/rajeshepili"} target="_blank">
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link href={"https://github.com/Linux-RE/github-profile-readme-generator"} target="_blank">
                                <Github className="h-4 w-4 mr-2" />
                                Repo
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
                    <p className="mb-2">Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components</p>
                    <p>
                        Free to use for commercial and personal projects with appropriate attribution •{" "}
                        <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto text-gray-500 hover:text-gray-700"
                            asChild
                        >
                            <Link href={"https://github.com/Linux-RE/github-profile-readme-generator"} target="_blank">
                                View License
                            </Link>
                        </Button>
                    </p>
                </div>
            </div>
        </footer>
    )
}
