"use client";
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Zap,
  Palette,
  Home,
  Code2,
  Award,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Play,
  ChevronDown,
} from "lucide-react"
import SplitText from "@/components/blocks/TextAnimations/SplitText/SplitText"
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: Code2,
      title: "Advanced Editor",
      description: "Rich markdown editor with syntax highlighting and live preview",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "Beautiful Templates",
      description: "Professional templates for developers, designers, and students",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Custom Badges",
      description: "Create stunning badges to showcase your achievements",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "GitHub Analytics",
      description: "Real-time stats and insights about your GitHub profile",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen z-10 text-center flex items-center px-6">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Free & Open Source
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Create Stunning
            <br />
            GitHub Profiles
          </h1>

          <SplitText
            text="Professional README generator with GitHub integration, beautiful templates, and comprehensive analytics"
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-5xl mx-auto"
            delay={100}
            duration={0.4}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.27, .29, .24, 1.05] }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg"
                asChild
              >
                <Link href={"/editor"}>
                  <Play className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.27, .29, .24, 1.05] }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-black hover:text-white hover:bg-white/10 px-8 py-4 text-lg"
                asChild
              >
                <Link href={"https://github.com/Linux-RE/github-profile-readme-generator"}>
                  <Github className="h-5 w-5 mr-2" />
                  View Source Code
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300">Everything you need to create professional GitHub profiles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="relative z-10 py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Github className="h-16 w-16 mx-auto mb-4 text-purple-400" />
            <h2 className="text-4xl font-bold mb-4">Open Source & Free</h2>
            <p className="text-xl text-gray-300 mb-8">
              README Pro is completely open source and free to use. Contribute to the project and help make it better
              for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <h3 className="font-semibold mb-2">100% Free</h3>
              <p className="text-sm text-gray-400">No hidden costs or premium features</p>
            </div>
            <div className="text-center">
              <Code2 className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <h3 className="font-semibold mb-2">Open Source</h3>
              <p className="text-sm text-gray-400">MIT licensed, contribute on GitHub</p>
            </div>
          </div>

          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-black hover:text-white hover:bg-white/10"
            asChild
          >
            <Link href={"https://github.com/Linux-RE/github-profile-readme-generator"}>
              <Github className="h-5 w-5 mr-2" />
              Contribute on GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Stand Out?</h2>
          <p className="text-xl text-gray-300 mb-8">Create your professional GitHub profile in minutes, not hours</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg"
              asChild
            >
              <Link href={"/editor"}>
                <Zap className="h-5 w-5 mr-2" />
                Start Creating Now
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Free & Open Source
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              No signup required
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
