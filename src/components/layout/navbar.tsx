import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Home, Github } from "lucide-react"
import Logo from "@/components/layout/logo";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={"/"}>
                                <Home className="h-4 w-4 mr-2" />
                                Home
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={"https://github.com/Linux-RE/github-profile-readme-generator"} target="_blank">
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
