import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Logo() {
    return (
        <Button variant="ghost" className="flex items-center space-x-2 hover:bg-transparent" asChild>
            <Link href={"/"}>
                <div className="relative">
                    <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-blue-500" />
                </div>
                <div className="text-left">
                    <h1 className="text-xl font-bold text-gray-900">README Pro</h1>
                </div>
            </Link>
        </Button>
    );
}