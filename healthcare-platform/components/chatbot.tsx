"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send, Stethoscope, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your MediConnect AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let botResponse = ""

      // Simple pattern matching for demo purposes
      const lowerInput = input.toLowerCase()
      if (lowerInput.includes("prescription") || lowerInput.includes("medication")) {
        botResponse =
          "Your latest prescription is Amoxicillin 500mg, 3 times daily for 7 days, prescribed by Dr. Sarah Johnson on May 15, 2025. Would you like me to explain more about this medication?"
      } else if (lowerInput.includes("appointment") || lowerInput.includes("schedule")) {
        botResponse =
          "You have an upcoming appointment with Dr. Sarah Johnson (Cardiologist) today at 3:00 PM. Would you like me to remind you 30 minutes before?"
      } else if (lowerInput.includes("report") || lowerInput.includes("test")) {
        botResponse =
          "Your latest blood test from May 12, 2025 shows normal results. Your cholesterol levels have improved by 15% since your last test. Would you like me to explain any specific values?"
      } else if (lowerInput.includes("side effect") || lowerInput.includes("reaction")) {
        botResponse =
          "Common side effects of Amoxicillin include nausea, vomiting, and diarrhea. If you're experiencing severe side effects, please contact your doctor immediately."
      } else {
        botResponse =
          "I'm here to help with your medical questions. You can ask about your prescriptions, appointments, medical reports, or general health information."
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
      <Card className="shadow-xl border-medical-primary/20">
        <CardHeader className="bg-medical-primary text-white rounded-t-lg p-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            <CardTitle className="text-base">MediConnect Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-medical-accent">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-medical-primary text-white">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-medical-primary text-white" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-medical-primary text-white">AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-3 border-t">
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-medical-primary hover:bg-medical-accent"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

