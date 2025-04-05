"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import MedicalCross from "./MedicalCross"
import "./ResetPasswordPage.css"

function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Extract token from URL query parameters
    const queryParams = new URLSearchParams(location.search)
    const resetToken = queryParams.get("token")

    if (resetToken) {
      setToken(resetToken)
    } else {
      setError("Invalid or missing reset token")
    }
  }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Validate passwords
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      console.log("Password reset completed with token:", token)
    }, 1500)
  }

  const handleBackToLogin = () => {
    navigate("/login") // Adjust based on your routing setup
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="logo-container">
          <MedicalCross className="logo-icon" />
          <h1 className="logo-text">MediBridge</h1>
        </div>

        {!isSubmitted ? (
          <>
            <div className="form-header">
              <h2 className="form-title">Reset Your Password</h2>
              <p className="form-subtitle">Please enter your new password below</p>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="reset-password-form">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={!token}
                />
                <p className="input-hint">Must be at least 8 characters</p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={!token}
                />
              </div>

              <button type="submit" className="submit-button" disabled={isLoading || !token}>
                {isLoading ? "Updating..." : "Reset Password"}
              </button>

              <button type="button" className="back-button" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Password Reset Complete</h2>
            <p className="success-message">Your password has been successfully reset.</p>
            <p className="success-instructions">You can now use your new password to log in to your account.</p>
            <button className="submit-button mt-4" onClick={handleBackToLogin}>
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordPage

