"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/AuthPages.css"

function SignupPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("patient")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to profile creation
      navigate(`/create-profile?type=${activeTab}`)
    }, 1500)
  }

  return (
    <div className="auth-container">
      <Link to="/" className="back-link">
        <i className="fas fa-arrow-left"></i> Back to Home
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-stethoscope"></i>
          </div>
          <h1>Create an account</h1>
          <p>Sign up to access your healthcare platform</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "patient" ? "active" : ""}`}
            onClick={() => setActiveTab("patient")}
          >
            Patient
          </button>
          <button
            className={`auth-tab ${activeTab === "doctor" ? "active" : ""}`}
            onClick={() => setActiveTab("doctor")}
          >
            Doctor
          </button>
        </div>

        <div className="auth-content">
          <h2>{activeTab === "patient" ? "Patient Signup" : "Doctor Signup"}</h2>
          <p>
            {activeTab === "patient"
              ? "Create an account to manage your health records"
              : "Create an account to manage your patients"}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className="form-text">Password must be at least 8 characters long</p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {activeTab === "doctor" && (
              <div className="form-group">
                <label htmlFor="licenseNumber">Medical License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  className="form-control"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className={`btn btn-primary btn-block ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage

