"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MedicalCross from "./MedicalCross"
import "./ForgotPasswordPage.css"

function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate API call to send reset email
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      console.log("Password reset requested for:", email)
    }, 1500)
  }

  const handleBackToLogin = () => {
    navigate("/login") // Adjust this based on your routing setup
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="logo-container">
          <MedicalCross className="logo-icon" />
          <h1 className="logo-text">MediBridge</h1>
        </div>

        {!isSubmitted ? (
          <>
            <div className="form-header">
              <h2 className="form-title">Forgot Password</h2>
              <p className="form-subtitle">Enter your email address and we'll send you a link to reset your password</p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${error ? "input-error" : ""}`}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="error-message">{error}</p>}
              </div>

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? "Sending..." : "Reset Password"}
              </button>

              <button type="button" className="back-button" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Check Your Email</h2>
            <p className="success-message">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="success-instructions">
              Please check your email and click on the link to reset your password. If you don't see it, please check
              your spam folder.
            </p>
            <button className="back-button mt-4" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage

