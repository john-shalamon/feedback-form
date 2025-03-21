"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

type Feedback = {
  id: string
  name: string
  email: string
  message: string
  date: string
}

export default function FeedbackForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !message) return

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toLocaleString(),
    }

    setFeedbacks([...feedbacks, newFeedback])
    setName("")
    setEmail("")
    setMessage("")
  }

  const toggleFeedback = (id: string) => {
    if (expandedFeedback === id) {
      setExpandedFeedback(null)
    } else {
      setExpandedFeedback(id)
    }
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Animated Ocean Background */}
      <div className="ocean-container">
        <div className="ocean-wave wave1"></div>
        <div className="ocean-wave wave2"></div>
        <div className="ocean-wave wave3"></div>
        <div className="ocean-wave wave4"></div>
        <div className="ocean-wave wave5"></div>
      </div>

      <div className="relative z-10 container mx-auto py-12 px-4">
        <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Share Your Feedback
            </CardTitle>
            <CardDescription className="text-center text-slate-600 font-medium text-base">
              We value your opinion. Let us know what you think!
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-700 font-semibold">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="border-blue-200 focus:border-blue-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-700 font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="border-blue-200 focus:border-blue-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-blue-700 font-semibold">
                  Feedback
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[120px] border-blue-200 focus:border-blue-400 transition-all"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Submit Feedback
              </Button>
            </CardFooter>
          </form>
        </Card>

        {feedbacks.length > 0 && (
          <div className="mt-8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-md text-center">Submitted Feedback</h2>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="bg-white/80 backdrop-blur-md shadow-lg border-0 overflow-hidden">
                  <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-cyan-50">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold text-blue-700">{feedback.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeedback(feedback.id)}
                        aria-label={expandedFeedback === feedback.id ? "Collapse feedback" : "Expand feedback"}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                      >
                        {expandedFeedback === feedback.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </Button>
                    </div>
                    <CardDescription className="text-slate-500 font-medium">{feedback.date}</CardDescription>
                  </CardHeader>
                  <CardContent
                    className={cn(
                      "transition-all duration-500 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white",
                      expandedFeedback === feedback.id ? "max-h-96 py-4" : "max-h-0 py-0",
                    )}
                  >
                    <p className="text-base mt-2 text-slate-700">{feedback.message}</p>
                    <p className="text-sm text-blue-600 mt-3 font-medium">Contact: {feedback.email}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

