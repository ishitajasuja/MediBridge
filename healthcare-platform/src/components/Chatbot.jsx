"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/Chatbot.css"

function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm your MediConnect AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
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

      const botMessage = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <i className="fas fa-stethoscope"></i>
          <h3>MediConnect Assistant</h3>
        </div>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}>
            {message.sender === "bot" && (
              <div className="avatar">
                <i className="fas fa-robot"></i>
              </div>
            )}

            <div className="message-content">
              <p>{message.content}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {message.sender === "user" && (
              <div className="avatar user-avatar">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="message bot-message">
            <div className="avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  )
}

export default Chatbot

